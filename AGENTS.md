<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All portfolio content lives in src/content/portfolioContent.ts; the page and the AI assistant (/api/chat) both read from it so they never disagree.
- Project cards use the shared Radix dialog and Button controls for focus trapping, scroll locking, keyboard dismissal, and consistent interaction.
- Optional portrait and project media use local paths defined in portfolioContent.ts and fixed-ratio fallback spaces so missing images do not shift the layout.
