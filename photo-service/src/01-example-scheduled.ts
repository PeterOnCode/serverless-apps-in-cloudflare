export default {
	async scheduled(event: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
		try {
			switch (event.cron) {
				case "*/15 * * * *":
					console.log("This will be executed every 15 minutes");
					break;
				case "*/30 * * * *":
					console.log("This will be executed every 30 minutes");
					break;
				default:
					console.log(`Unknown cron pattern: ${event.cron}`);
			}
		} catch (error) {
			console.error("Error in scheduled handler:", error);
			throw error;
		}
	},
} satisfies ExportedHandler<Env>;
