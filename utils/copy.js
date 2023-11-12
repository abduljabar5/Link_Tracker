import { toast } from "sonner";
export async function copyToClipboard (text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
