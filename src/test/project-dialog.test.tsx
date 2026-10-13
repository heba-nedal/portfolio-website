import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/content/portfolioContent";

afterEach(cleanup);

describe("Project dialogs", () => {
  it("opens only the selected project, locks scrolling, and restores focus after Escape", async () => {
    render(<>{projects.map((p, index) => <ProjectCard key={p.id} p={p} index={index} />)}</>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const trigger = screen.getAllByRole("button", { name: "View details" })[1];
    if (!trigger) throw new Error("Missing project trigger");
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toHaveAccessibleName(projects[1]?.title);
    expect(document.body).toHaveAttribute("data-scroll-locked", "1");
    fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
  });

  it("dismisses through each explicit close control", async () => {
    const p = projects[0];
    if (!p) throw new Error("Missing project");
    render(<ProjectCard p={p} index={0} />);
    for (const name of ["Close dialog", "Close"]) {
      fireEvent.click(screen.getByRole("button", { name: "View details" }));
      fireEvent.click(screen.getByRole("button", { name }));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    }
  });
});