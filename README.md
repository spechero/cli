# SpecHero Command Line Utility

Instantly generate and manage quick test projects in a variety of languages.

For instance,
```
spechero new ruby-rspec calc
```
Creates a Ruby project called `calc`, opens it in your editor and runs starts
a Docker container to run your specs as you edit them.

# Install
## Requires:
   - NodeJS 14 or above
   - Docker-Compose (as provided by Docker for Mac or Docker for Windows)

   ```
   npm install spechero -g
   ```
   or

   ```
   yarn global add spechero
   ```

# Usage

Use Spechero to generate and manage scratch projects. Your test projects live (by default) in your `$HOME/.spechero` folder.

Run `spechero help` for usage information.
