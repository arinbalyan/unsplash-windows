import { getPreferenceValues, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { exec } from "child_process";
import { promisify } from "util";
import { join } from "path";
import { homedir } from "os";

const execP = promisify(exec);

interface SaveImageProps {
  url: string;
  id: string;
}

export const saveImage = async ({ url, id }: SaveImageProps) => {
  const { downloadSize } = getPreferenceValues<Preferences>();

  try {
    if (process.platform === "win32") {
      const dest = join(homedir(), "Desktop", `${id}-${downloadSize}.jpg`);
      await execP(`curl.exe -s -o "${dest}" "${url}"`);
      return;
    }

    await showHUD("Please select a location to save the image...");

    await runAppleScript(`
      set outputFolder to choose folder with prompt "Please select an output folder:"
      set temp_folder to (POSIX path of outputFolder) & "${id}-${downloadSize}.jpg"
      set q_temp_folder to quoted form of temp_folder

      set cmd to "curl -o " & q_temp_folder & " " & "${url}"
        do shell script cmd
    `);
  } catch (err) {
    console.error(err);
    await showHUD("Couldn't save the image...");
  }
};

export default saveImage;
