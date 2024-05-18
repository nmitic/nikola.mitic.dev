import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ChatHistory } from "./InterviewerAI/components/ChatHistory";

export const useChatHistoryPdf = (chatHistory: ChatHistory) => {
  const document = new jsPDF();

  const tableBody = chatHistory.map(({ answer, question }) => {
    return [question, answer];
  });

  autoTable(document, {
    head: [["Recruiter - Question", "Answer - Nikola Mitic"]],
    body: tableBody,
    margin: 10,
    startY: 40,
    theme: "plain",
    styles: {
      minCellWidth: 80,
      textColor: [146, 161, 198],
      fillColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [194, 13, 144],
      textColor: [240, 171, 61],
    },
    willDrawPage: (HookData) => {
      document.setFillColor(0, 0, 0);
      document.rect(0, 0, 500, 500, "F");

      if (HookData.pageNumber == 1) {
        document.setTextColor("#ffffff");
        document.setFontSize(12);
        document.text("Position: Senior Software Developer", 10, 7);
        document.text(
          `PDF generated: ${document
            .getCreationDate("jsDate")
            .toLocaleDateString()}`,
          148,
          7
        );
        document.text("Full Name: Nikola Mitic", 10, 14);
        document.text("Email: nikola.mitic.dev@gmail.com", 10, 21);
        document.textWithLink("Website: https://nikola-mitic.dev/", 10, 28, {
          url: "https://nikola-mitic.dev/",
        });
      }
    },
  });

  const openPdfInNewTab = () => document.output("dataurlnewwindow");
  const downloadPdf = () =>
    document.save("nikola_mitic_senior_software_developer_interview");

  return { document, openPdfInNewTab, downloadPdf };
};
