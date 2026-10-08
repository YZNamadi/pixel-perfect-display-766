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

- Render the supplied Kearly logo through the shared `KearlyLogo` component so every brand placement stays visually consistent.
- Use the shared `AppShell` for new authenticated product pages so navigation, branding, and active states remain consistent.
- Keep equipment detail views in dedicated routes linked from the registry and styled within the shared shell to preserve product navigation.
- Maintain the equipment edit screen as a dedicated sectioned form rather than the generic record form, so asset-specific fields and detail-page navigation stay intact.
- Building New Task opens a dedicated accessible dialog in place rather than a task-type chooser or separate wizard, preserving the building context.
- Building Edit Details opens a dedicated accessible site-details dialog and updates the current building view; no separate edit-site route is retained, preserving building context.
- Use ProductSelect for native-style option fields and the shared product menu tokens for custom/action dropdowns; retain native form values and handlers so visual changes do not alter workflows.
