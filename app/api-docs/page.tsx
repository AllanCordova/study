"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <div className="w-full min-h-screen p-[var(--spacing-lg)]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-[var(--spacing-lg)]">
          <h1 className="text-[var(--font-size-xl)] font-bold text-[var(--text-primary)]">
            API Documentation
          </h1>
          <p className="text-[var(--text-secondary)]">
            Swagger UI for available endpoints.
          </p>
        </header>

        <SwaggerUI url="/api/swagger" docExpansion="list" />
      </div>
    </div>
  );
}
