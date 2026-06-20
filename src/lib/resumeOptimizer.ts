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

  // Draw Header Name
  doc.setFontSize(18);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(name.toUpperCase(), marginX, currentY);
  currentY += 6;

  // Role tag
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(99, 102, 241); // indigo-500
  doc.text(`Target Job Class: ${role}`.toUpperCase(), marginX, currentY);
  currentY += 8;

  doc.setTextColor(38, 38, 38); // slate-800
  doc.setFont('Helvetica', 'normal');

  // Parse lines to locate a "Skills" section for native injection
  let skillsSectionLineIdx = -1;
  const skillsRegex = /skills|technologies|core competencies|tooling/i;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length < 35 && skillsRegex.test(line) && (line.endsWith(':') || /^[A-Z\s]+$/.test(line))) {
      skillsSectionLineIdx = i;
      break;
    }
  }

  // Draw resume text line by line
  doc.setFontSize(9.5);
  doc.setTextColor(38, 38, 38);

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (rawLine === name || rawLine.length === 0) continue;

    // Apply verb modifications
    let optimizedLine = optimizeActionVerbs(rawLine);

    // Dynamic page break detection
    if (currentY > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
    }

    // Heuristics for headers
    const isHeading = 
      (rawLine.length < 35 && /^[A-Z\s&,\/]+$/.test(rawLine)) || 
      (rawLine.length < 30 && rawLine.endsWith(':'));

    if (isHeading) {
      currentY += 3;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.text(optimizedLine.toUpperCase(), marginX, currentY);
      
      // Draw a line under major headings
      doc.setDrawColor(241, 245, 249); // slate-100
      doc.line(marginX, currentY + 1.5, marginX + contentWidth, currentY + 1.5);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(64, 64, 64); // neutral-700
      currentY += 5.5;
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

    // Native injection: if this was the skills section header, inject the missing/equipped keywords immediately!
    if (i === skillsSectionLineIdx && equippedKeywords.length > 0) {
      const injectionText = `Additional Technologies (ATS Optimized): ${equippedKeywords.join(', ')}`;
      const splitInjection = doc.splitTextToSize(injectionText, contentWidth);
      
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(99, 102, 241); // indigo-500
      
      splitInjection.forEach((lineText: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(lineText, marginX, currentY);
        currentY += 4.5;
      });
      
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(64, 64, 64);
      currentY += 1.5;
    }
  }

  // If no native skills section was found, append equipped skills at the bottom
  if (skillsSectionLineIdx === -1 && equippedKeywords.length > 0) {
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = 20;
    }
    
    currentY += 5;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(99, 102, 241);
    doc.text('CORE SKILLS & KEYWORDS (ATS SIMULATOR INJECTED)', marginX, currentY);
    
    doc.setDrawColor(241, 245, 249);
    doc.line(marginX, currentY + 1.5, marginX + contentWidth, currentY + 1.5);
    
    currentY += 6;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(64, 64, 64);

    const skillsList = equippedKeywords.join(' • ');
    const splitSkills = doc.splitTextToSize(skillsList, contentWidth);
    
    splitSkills.forEach((line: string) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(line, marginX, currentY);
      currentY += 4.5;
    });
  }

  // Trigger browser download
  const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`optimized_${safeName}_resume.pdf`);
}
