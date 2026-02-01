import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export const downloadAsPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    // html-to-image handles modern CSS (oklch, lab) better than html2canvas
    const dataUrl = await toJpeg(element, { 
      quality: 0.95, 
      backgroundColor: "#ffffff",
      pixelRatio: 2, // Equivalent to scale: 2 in html2canvas
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const pdf = new jsPDF({
      orientation: img.width > img.height ? "landscape" : "portrait",
      unit: "px",
      format: [img.width, img.height],
    });

    pdf.addImage(dataUrl, "JPEG", 0, 0, img.width, img.height);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Provide fallback to standard print if everything fails
    if (typeof window !== "undefined") {
      alert("PDF generation failed. Opening print dialog instead.");
      window.print();
    }
  }
};
