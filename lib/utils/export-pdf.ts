import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface PdfColumn {
  header: string;
  dataKey: string;
}

export function exportToPdf<T extends Record<string, unknown>>(
  data: T[],
  columns: PdfColumn[],
  filename: string,
  title = 'Report',
): void {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(title, 14, 20);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

  const rows = data.map((item) =>
    columns.map((col) => String(item[col.dataKey] ?? '')),
  );

  autoTable(doc, {
    head: [columns.map((c) => c.header)],
    body: rows,
    startY: 35,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [26, 26, 26], textColor: 255 },
    alternateRowStyles: { fillColor: [250, 248, 245] },
  });

  doc.save(`${filename}.pdf`);
}
