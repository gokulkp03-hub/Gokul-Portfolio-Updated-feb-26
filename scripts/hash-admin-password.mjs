// Prints an ADMIN_PASSWORD_HASH value for the admin login.
// Usage: pnpm hash-password   (prompts for the password; nothing is echoed or stored)
// The format must match server/_core/password.ts: scrypt$<saltHex>$<hashHex>
import { randomBytes, scryptSync } from "crypto";
import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: process.stdin.isTTY });
// Hide typed characters; only print the prompt itself.
rl._writeToOutput = s => {
  if (s.includes("Password")) process.stdout.write(s);
};

rl.question("Password: ", password => {
  rl.close();
  process.stdout.write("\n");
  if (password.length < 12) {
    console.error("Use at least 12 characters.");
    process.exit(1);
  }
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
});
