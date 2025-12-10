# Release Process

This project uses GitHub Actions to automate the release process.

## Creating a New Release

### 1. Trigger the Release Workflow

1. Go to the **Actions** tab in GitHub
2. Select the **Release** workflow from the left sidebar
3. Click **Run workflow**
4. Choose the version bump type:
   - **patch**: Bug fixes and minor updates (2.2.2 → 2.2.3)
   - **minor**: New features, backward compatible (2.2.2 → 2.3.0)
   - **major**: Breaking changes (2.2.2 → 3.0.0)
5. Click **Run workflow**

### 2. Review the Release PR

The workflow will automatically:
- Bump the version in `package.json`
- Generate a changelog from git commits since the last release
- Update `CHANGELOG.md` with the new version entry
- Create a Pull Request with all changes

Review the PR carefully:
- Check that the version bump is correct
- Review the generated changelog
- Verify all changes look good

### 3. Merge the Release PR

Once satisfied, merge the PR to the main branch.

### 4. Create a GitHub Release

After merging:
1. Go to the **Releases** page
2. Click **Draft a new release**
3. Create a new tag matching the version (e.g., `v2.3.0`)
4. Use the changelog from the merged PR as the release notes
5. Publish the release

### 5. Publish to npm

After creating the GitHub release:

```bash
# Ensure you're on the main branch with latest changes
git checkout main
git pull origin main

# Build the package
yarn build

# Publish to npm (requires npm authentication)
npm publish
```

## Manual Release (Alternative)

If you prefer to do releases manually:

```bash
# Bump version
yarn version --patch  # or --minor, --major

# Update CHANGELOG.md manually

# Commit changes
git add package.json CHANGELOG.md
git commit -m "chore: bump version to vX.Y.Z"

# Create tag
git tag vX.Y.Z

# Push changes and tag
git push origin main --tags

# Build and publish
yarn build
npm publish
```

## Changelog Format

The automated workflow generates changelog entries from git commit messages. For best results, use conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test updates

Example:
```
feat: add dark mode support
fix: resolve memory leak in GridWrapper
chore: update dependencies
```
