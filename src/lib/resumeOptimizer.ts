import { jsPDF } from 'jspdf';

// Helper to replace passive phrasing with active, recruiter-friendly action verbs
export function optimizeActionVerbs(text: string): string {
  const replacements: Record<string, string> = {
    'responsible for': 'Led development of',
    'helped with': 'Collaborated on and engineered',
    'assisted in': 'Spearheaded implementation of',
    'worked on': 'Designed and optimized',
    'managed': 'Orchestrated and managed',
    'handled': 'Automated and resolved',
    'led': 'Spearheaded and led',
    'built': 'Architected and built',
    'made': 'Engineered and launched',
    'took care of': 'Optimized and maintained'
  };

  let optimized = text;
  Object.entries(replacements).forEach(([passive, active]) => {
    const regex = new RegExp(`\\b${passive}\\b`, 'gi');
    optimized = optimized.replace(regex, active);
  });

  return optimized;
}

export function generateImprovedPDF(
  originalText: string,
  equippedKeywords: string[],
  role: string
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Basic styling configurations
  const marginX = 20;
  let currentY = 20;
  const pageHeight = 297;
  const contentWidth = 170;

  // Font setup
  doc.setFont('Helvetica', 'normal');

  // Split original resume text by lines
  const lines = originalText.split('\n');

  // Find candidate name (usually the first non-empty line)
  let name = 'Candidate Profile';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().length > 0) {
      name = lines[i].trim();
      break;
    }
  }

  // Draw Header
  doc.setFontSize(18);
  doc.setFont('Helvetica', 'bold');
  doc.text(name.toUpperCase(), marginX, currentY);
  currentY += 6;

  // Subtitle/Role target
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(99, 102, 241); // indigo-500
  doc.text(`Target Job Class: ${role}`.toUpperCase(), marginX, currentY);
  currentY += 8;

  doc.setTextColor(38, 38, 38); // slate-800
  doc.setFont('Helvetica', 'normal');

  // Write a notice about optimization at the top
  doc.setFontSize(8);
  doc.setFont('Helvetica', 'oblique');
  doc.setTextColor(115, 115, 115); // neutral-500
  doc.text('Optimized via Recruiter Desk Simulator (System Action Verbs & Skill Buffs Injected)', marginX, currentY);
  currentY += 8;

  // Add Dynamic Equipped Skills Section
  if (equippedKeywords.length > 0) {
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(99, 102, 241);
    doc.text('SIMULATED SYSTEM BUFFS (ATS OPTIMIZED)', marginX, currentY);
    currentY += 4;
    
    // Draw horizontal separator line
    doc.setDrawColor(229, 231, 235);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 5;

    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(38, 38, 38);
    
    const skillsList = equippedKeywords.join(' • ');
    const splitSkills = doc.splitTextToSize(skillsList, contentWidth);
    
    splitSkills.forEach((line: string) => {
      doc.text(line, marginX, currentY);
      currentY += 4.5;
    });
    currentY += 4;
  }

  // Draw optimized remaining body text
  doc.setFontSize(11);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(38, 38, 38);
  doc.text('RESUME CONTENT DETAILED SUMMARY', marginX, currentY);
  currentY += 4;
  
  doc.setDrawColor(229, 231, 235);
  doc.line(marginX, currentY, marginX + contentWidth, currentY);
  currentY += 6;

  doc.setFontSize(9.5);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(38, 38, 38);

  // Parse lines and output optimized verb blocks
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (rawLine === name || rawLine.length === 0) continue;

    // Apply verb modifications
    const optimizedLine = optimizeActionVerbs(rawLine);

    // Dynamic page break detection
    if (currentY > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
    }

    // Bold headings (simple heuristic: short, uppercase line or lines ending in colon)
    const isHeading = 
      (rawLine.length < 35 && /^[A-Z\s&,\/]+$/.test(rawLine)) || 
      (rawLine.length < 30 && rawLine.endsWith(':'));

    if (isHeading) {
      currentY += 3;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(optimizedLine.toUpperCase(), marginX, currentY);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9.5);
      currentY += 5;
    } else {
      const splitText = doc.splitTextToSize(optimizedLine, contentWidth);
      splitText.forEach((lineText: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(lineText, marginX, currentY);
        currentY += 4.5;
      });
      currentY += 1.5;
    }
  }

  // Trigger browser download
  const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`optimized_${safeName}_resume.pdf`);
}
