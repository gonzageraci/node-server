import app from "./app"
import { saveRates } from "./cron-jobs/jobs"
import "./database"

saveRates.start();

app.listen(3005);
console.log("server on port", 3005);