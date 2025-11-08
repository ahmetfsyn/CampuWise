import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Participant } from "@/types/models";

export const exportParticipantsToPDF = async (
  eventTitle: string,
  participants: Participant[]
) => {
  try {
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
          </style>
        </head>
        <body>
          <h1>Participants of ${eventTitle}</h1>
          <table>
            <tr><th>Full Name</th><th>Email</th></tr>
            ${participants
              .map(
                (p) => `
                <tr>
                  <td>${p.fullName}</td>
                  <td>${p.email}</td>
                </tr>`
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share Participants List",
    });
  } catch (error) {
    console.error("PDF export failed:", error);
  }
};
