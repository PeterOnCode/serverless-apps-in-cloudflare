# Serverless Apps in Cloudflare


## 1. Photo Service

### 1.1 Create a New Worker

Here is a summary of the provided text in bullet points:

*   **Core Tools:** The primary tools for developing on Cloudflare are the command-line interfaces (CLIs) [**Wrangler**](https://developers.cloudflare.com/workers/wrangler/) (for managing projects) and **C3** (for creating them).
*   **What is a Worker?** A [Cloudflare Worker](https://developers.cloudflare.com/workers/) is a serverless function, similar in concept to AWS Lambdas or Azure Functions.
*   **Execution Environment:**
    *   Workers run on Chrome's V8 JavaScript engine, not a full Node.js environment.
    *   A Node.js compatibility flag allows many `npm` packages to work by implementing some Node APIs and polyfilling others.
*   **Language Support:**
    *   Workers support JavaScript, TypeScript, and any language that can compile to JS or WebAssembly (WASM), such as C and Rust.
    *   Python can now be deployed directly to a Worker without a compilation step.
*   **Prerequisites:** You must have Node.js (version 18 or newer) and npm installed.
*   **Creation Process:**
    *   Create a new project using the command: `npm create cloudflare@latest`.
    *   You will be prompted to make several choices, including the project directory, application type ("Hello World" Worker), whether to use TypeScript and Git, and if you want to deploy immediately.



### 1.2 Configure a Worker

*   **`wrangler.toml`:**
    *   This is the main, human-friendly configuration file for your Cloudflare Worker, using the TOML format (similar to YAML).
    *   It contains key settings, including:
        *   `name`: The URL-friendly name for your Worker.
        *   `main`: The entry point file that handles incoming requests.
        *   `compatibility_date`: Specifies the Worker's runtime version to ensure stability and prevent breakage from platform updates.
        *   `compatibility_flags`: Allows for tweaking the runtime environment.

*   **Other Important Files:**
    *   **`package.json`**: Defines the npm packages and dependencies your Worker requires.
    *   **`tsconfig.json`**: Used to configure the settings for TypeScript.



