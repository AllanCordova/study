import { Avatar } from "@/components/person/Avatar";
import { useAvatarProgression } from "@/hooks/useAvatarProgression";
import { render, screen } from "@testing-library/react";

jest.mock("/hooks/useAvatarProgression");
jest.mock("/components/ui/Loading", () => ({
  Loading: () => <div data-testid="loading-component" />,
}));

describe("test avatar component", () => {
  const hoockMock = useAvatarProgression as jest.Mock;

  const mockCurrentAvatar = {
    name: "Novice Hero",
    level: 1,
    image_path: "/novice.png",
  };

  const mockNextAvatar = {
    name: "Ultimate",
    level: 22,
    image_path: "/novice.png",
  };

  it("loading is mosted when data is not load", () => {
    hoockMock.mockReturnValue({
      currentAvatar: null,
      nextAvatar: null,
      isLoading: true,
      userCycles: 0,
    });

    render(<Avatar />);

    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  it("test if correct avatar is show", () => {
    hoockMock.mockReturnValue({
      currentAvatar: mockCurrentAvatar,
      nextAvatar: mockNextAvatar,
      isLoading: false,
      userCycles: 10,
    });

    render(<Avatar />);

    expect(screen.getByTestId("current-avatar")).toHaveTextContent(
      mockCurrentAvatar.name,
    );

    expect(screen.getByTestId("next-avatar")).toHaveTextContent(
      mockNextAvatar.name,
    );
  });

  it("test show max lvl when user rached", () => {
    hoockMock.mockReturnValue({
      currentAvatar: mockNextAvatar,
      nextAvatar: null,
      isLoading: false,
      userCycles: 90,
    });

    render(<Avatar />);

    expect(screen.getByTestId("current-avatar")).toHaveTextContent(
      mockNextAvatar.name,
    );

    expect(screen.getByTestId("max-lvl")).toHaveTextContent(
      "MAXIMUM LEVEL REACHED!",
    );
  });
});
