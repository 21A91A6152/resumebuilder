const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateResume(data) {
  const doc = new PDFDocument();
  const filePath = `resumes/${data.name}_resume.pdf`;

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Resume", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${data.name}`);
  doc.text(`Education: ${data.education}`);
  doc.text(`Purpose: ${data.purpose}`);
  doc.text(`Courses: ${data.selectedCourses.join(", ")}`);

  doc.end();

  return `http://localhost:5000/${filePath}`;  
}
