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

### 1.3 Implement Logic in Your Workers

*   **Entry Point:** The core of a Cloudflare Worker is a default exported object from a file in the `src` directory (e.g., `src/index.ts`).

*   **The `fetch` Method:**
    *   This method is the primary handler that is executed whenever your Worker receives an HTTP request.
    *   It accepts three parameters:
        1.  `request`: An object representing the incoming HTTP request (headers, body, etc.), based on the standard Fetch API.
        2.  `env`: An object providing access to environment variables, secrets, and other Cloudflare services like databases or queues.
        3.  `ctx` (Execution Context): Allows you to perform actions after a response has been sent, such as using `waitUntil` to extend the Worker's execution time.
    *   It must return a `Response` object, which is also part of the Fetch API standard.

*   **Code Organization:**
    *   There are two main approaches for structuring serverless applications:
        *   **Multiple Workers:** Each API endpoint (e.g., `/users`, `/products`) is its own separate, focused Worker.
        *   **Monolithic Worker:** A single Worker receives all requests and contains logic to route them to the appropriate handler internally.
    *   The recommended approach is to start with a single, monolithic Worker and split it into multiple functions later if the application becomes too complex.

### 1.4 Run Scheduled Tasks

> [Products](https://developers.cloudflare.com/products/) > [Workers](https://developers.cloudflare.com/workers/) > [Configuration](https://developers.cloudflare.com/workers/configuration/) > [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)

*   **Functionality:** Cloudflare Workers can run on a schedule, not just in response to HTTP requests, by using **Cron Triggers**.

*   **Configuration:** Schedules are defined in the `wrangler.toml` file under a `[triggers]` section using standard cron syntax (e.g., `crons = ["*/15 * * * *"]` to run every 15 minutes).

*   **Implementation:**
    *   The code for the scheduled task is placed inside a `scheduled` function within the Worker's default export.
    *   You can define multiple schedules. The `event.cron` property inside the function allows you to identify which specific schedule triggered the execution.

*   **Versatility:** A single Worker can handle both HTTP requests (using a `fetch` function) and scheduled tasks (using a `scheduled` function) simultaneously.

### 1.5 Deploy Your First Worker

*   **Prerequisites:** You must have a free Cloudflare account. During signup, you will choose a unique subdomain that will be used for your development URLs.

*   **Deployment Command:**
    *   To deploy your Worker, navigate to the project's root folder and run `npm run deploy`.
    *   This command is a shortcut for `wrangler deploy`, which is the core command-line tool for managing Cloudflare Workers.

*   **First-Time Authentication:**
    *   When you deploy for the first time, a browser window will open asking you to log in to your Cloudflare account and grant permissions.
    *   This step is only required once; your authentication token will be saved locally for future deployments.

*   **Deployment Outcome:**
    *   After a successful deployment, the terminal will display the live URL of your Worker.
    *   The URL follows the format: `https://{worker-name}.{your-cloudflare-subdomain}.workers.dev`.
    *   Cloudflare automatically handles the necessary DNS and SSL certificates for this URL.

*   **Important Limits:**
    *   https://developers.cloudflare.com/pages/platform/limits/

