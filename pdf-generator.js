document.getElementById('pdfForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const containerNumbers = document.getElementById('containerNumbers').value.split('\n');
    const pickupMethod = document.getElementById('pickupMethod').value;
    const date = document.getElementById('date').value;

    containerNumbers.forEach(containerNumber => {
        if (containerNumber.trim() !== '') {
            generatePDF(customerName, containerNumber.trim(), pickupMethod, date);
        }
    });
});

function generatePDF(customerName, containerNumber, pickupMethod, date) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape",
    });

    const pageWidth = pdf.internal.pageSize.width;

    pdf.setFont("helvetica", "bold");

    const firstLineText = customerName;
    pdf.setFontSize(100);
    const firstLineTextWidth = pdf.getTextWidth(firstLineText);
    pdf.text(firstLineText, (pageWidth - firstLineTextWidth) / 2, 60);

    const secondLineText = containerNumber;
    pdf.setFontSize(110);
    const secondLineTextWidth = pdf.getTextWidth(secondLineText);
    pdf.text(secondLineText, (pageWidth - secondLineTextWidth) / 2, 100);

    const thirdLineText = pickupMethod;
    pdf.setFontSize(80);
    const thirdLineTextWidth = pdf.getTextWidth(thirdLineText);
    pdf.text(thirdLineText, (pageWidth - thirdLineTextWidth) / 2, 150);

    const fourthLineText = date;
    pdf.setFontSize(100);
    const fourthLineTextWidth = pdf.getTextWidth(fourthLineText);
    pdf.text(fourthLineText, (pageWidth - fourthLineTextWidth) / 2, 190);

    pdf.save(`${containerNumber}.pdf`);
}
