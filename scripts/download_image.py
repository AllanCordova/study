import os
import sys
import argparse
import shutil
import requests
import json
import re
import time
from PIL import Image
from io import BytesIO
from urllib.parse import quote_plus

def load_characters():
    characters_file = os.path.join(os.path.dirname(__file__), "characters.json")
    try:
        with open(characters_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return [(char['name'], char['image_path']) for char in data.get('characters', [])]
    except FileNotFoundError:
        print(f"Warning: characters.json not found")
        return []
    except json.JSONDecodeError as e:
        print(f"Error parsing characters.json: {e}")
        return []

def get_headers():
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }

def show_image_preview(image_path):
    try:
        img = Image.open(image_path)
        max_size = (800, 800)
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        img.show()
        return True
    except Exception as e:
        print(f"  Erro ao mostrar preview: {e}")
        return False

def download_image_from_url(url, timeout=30):
    try:
        response = requests.get(url, headers=get_headers(), timeout=timeout, stream=True)
        response.raise_for_status()
        
        content_type = response.headers.get('content-type', '').lower()
        if not content_type.startswith('image/'):
            return None
        
        temp_file = BytesIO(response.content)
        try:
            Image.open(temp_file).verify()
            temp_file.seek(0)
            return temp_file
        except:
            return None
            
    except Exception as e:
        return None

def load_search_queries():
    queries_file = os.path.join(os.path.dirname(__file__), "search_queries.json")
    try:
        with open(queries_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: search_queries.json not found, using default queries")
        return {
            "query_templates": [
                "{name} character portrait",
                "{name} official art",
                "{base_name} character illustration"
            ],
            "site_suffixes": ["site:{site}"],
            "base_filters": {}
        }
    except json.JSONDecodeError as e:
        print(f"Error parsing search_queries.json: {e}")
        return {
            "query_templates": ["{name} character"],
            "site_suffixes": [],
            "base_filters": {}
        }

def build_enhanced_queries(character_name, query_config=None):
    if query_config is None:
        query_config = load_search_queries()
    
    base_name = character_name.split('(')[0].strip()
    
    queries = []
    
    characters_queries = query_config.get("characters", {})
    if character_name in characters_queries:
        specific_queries = characters_queries[character_name].get("queries", [])
        if specific_queries:
            queries.extend(specific_queries)
    
    if not queries:
        templates = query_config.get("query_templates", [])
        for template in templates:
            query = template.format(name=character_name, base_name=base_name)
            queries.append(query)
    
    return queries

def search_google_images(query, max_results=10, preferred_sites=None):
    image_urls = []
    
    query_config = load_search_queries()
    
    enhanced_queries = build_enhanced_queries(query, query_config)
    
    search_queries = [query] + enhanced_queries[:3]
    
    if preferred_sites:
        site_suffixes = query_config.get("site_suffixes", ["site:{site}"])
        for site in preferred_sites[:2]:
            for suffix_template in site_suffixes[:2]:
                suffix = suffix_template.format(site=site)
                search_queries.append(f"{query} {suffix}")
    
    for idx, search_query in enumerate(search_queries):
        try:
            if idx > 0:
                time.sleep(0.5)
            
            encoded_query = quote_plus(search_query)
            url = f"https://www.google.com/search?q={encoded_query}&tbm=isch&tbs=isz:l,itp:photo,ic:color,imgo:1"
            
            response = requests.get(url, headers=get_headers(), timeout=15)
            response.raise_for_status()
            
            html = response.text
            
            pattern1 = r'"ou":"(https?://[^"]+)"'
            matches1 = re.findall(pattern1, html)
            for match in matches1:
                if match not in image_urls and 'googleusercontent.com' not in match:
                    if any(ext in match.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']) or 'http' in match:
                        image_urls.append(match)
            
            pattern2 = r'"(https?://[^"]+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^"]*)?)"'
            matches2 = re.findall(pattern2, html, re.IGNORECASE)
            for match in matches2:
                if match not in image_urls:
                    if 'googleusercontent.com' not in match and 'gstatic.com' not in match:
                        image_urls.append(match)
            
            pattern3 = r'\["https?://[^"]+",\d+,\d+\]'
            matches3 = re.findall(pattern3, html)
            for match in matches3:
                try:
                    data = json.loads(match)
                    if isinstance(data, list) and len(data) > 0:
                        img_url = data[0]
                        if img_url.startswith('http') and img_url not in image_urls:
                            if 'googleusercontent.com' not in img_url:
                                image_urls.append(img_url)
                except:
                    continue
            
            pattern4 = r'"ow":\d+,"oh":\d+,"ou":"(https?://[^"]+)"'
            matches4 = re.findall(pattern4, html)
            for match in matches4:
                if match not in image_urls:
                    image_urls.append(match)
            
            seen = set()
            unique_urls = []
            for url in image_urls:
                if url not in seen:
                    seen.add(url)
                    unique_urls.append(url)
            
            image_urls = unique_urls
            
            if len(image_urls) >= max_results:
                break
                
        except Exception as e:
            print(f"  Aviso na busca '{search_query}': {str(e)[:50]}")
            continue
    
    return image_urls[:max_results]

def download_and_save_image(url, save_path, min_size=(200, 200)):
    try:
        img_data = download_image_from_url(url)
        if img_data is None:
            return False
        
        with Image.open(img_data) as img:
            if img.size[0] < min_size[0] or img.size[1] < min_size[1]:
                return False
            
            img = img.convert("RGB")
            img.save(save_path, "webp", quality=90, method=6)
            return True
            
    except Exception as e:
        return False

def download_and_convert(char_list, interactive=False, preferred_sites=None):
    output_dir = 'public/assets/persons'
    temp_dir = 'temp_download'
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    
    if preferred_sites is None:
        preferred_sites = ['pinterest.com', 'deviantart.com', 'artstation.com', 'imgur.com']
    
    for name, path in char_list:
        filename = os.path.basename(path)
        final_path = os.path.join(output_dir, filename)
        
        if os.path.exists(final_path) and not interactive:
            print(f"\n--- Pulando {name} (já existe) ---")
            continue
        
        print(f"\n--- Processando: {name} ---")
        
        print(f"Buscando imagens de alta qualidade para '{name}'...")
        try:
            image_urls = search_google_images(name, max_results=15, preferred_sites=preferred_sites)
        except Exception as e:
            print(f"✗ Erro na busca: {e}")
            continue
        
        if not image_urls:
            print(f"✗ Nenhuma imagem encontrada para {name}")
            print("  Dica: Tente executar novamente ou use modo interativo para mais opções")
            continue
        
        print(f"  ✓ Encontradas {len(image_urls)} imagens")
        
        saved = False
        for idx, img_url in enumerate(image_urls):
            try:
                temp_path = os.path.join(temp_dir, f"temp_{idx}.jpg")
                
                print(f"  Tentando imagem {idx + 1}/{len(image_urls)}...", end=" ")
                
                if not download_and_save_image(img_url, temp_path, min_size=(300, 300)):
                    print("✗ (tamanho insuficiente ou erro no download)")
                    continue
                
                if interactive:
                    with Image.open(temp_path) as img:
                        print(f"✓ Tamanho: {img.size[0]}x{img.size[1]}")
                        
                        if show_image_preview(temp_path):
                            response = input("  Usar esta imagem? (s/n): ").strip().lower()
                            if response != 's':
                                print("  Buscando próxima imagem...")
                                os.remove(temp_path)
                                continue
                else:
                    print("✓")
                
                shutil.move(temp_path, final_path)
                print(f"✓ Sucesso! Salvo em: {final_path}")
                saved = True
                break
                
            except Exception as e:
                print(f"✗ Erro: {e}")
                if os.path.exists(temp_path):
                    try:
                        os.remove(temp_path)
                    except:
                        pass
                continue
        
        if not saved:
            print(f"✗ Não foi possível salvar imagem para {name}")
        
        time.sleep(1)
    
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Baixa imagens de personagens do Google Images com alta qualidade'
    )
    parser.add_argument(
        '--interactive', '-i',
        action='store_true',
        help='Modo interativo: mostra preview e pergunta antes de salvar cada imagem'
    )
    parser.add_argument(
        '--sites',
        nargs='+',
        default=['pinterest.com', 'deviantart.com', 'artstation.com'],
        help='Sites preferidos para busca (padrão: pinterest.com deviantart.com artstation.com)'
    )
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("Download de Imagens de Personagens")
    print("=" * 60)
    if args.interactive:
        print("Modo INTERATIVO ativado - você poderá aprovar cada imagem")
    print(f"Sites preferidos: {', '.join(args.sites)}")
    print("=" * 60)
    
    characters = load_characters()
    if not characters:
        print("Erro: Nenhum personagem encontrado em characters.json")
        sys.exit(1)
    
    download_and_convert(characters, interactive=args.interactive, preferred_sites=args.sites)
