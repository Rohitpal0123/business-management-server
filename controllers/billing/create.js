const fs = require('fs');
const path = require('path');
const pdf = require("html-pdf");
const os = require("os");
const Transaction = require("../../models/transaction.model"); // Adjust the path as necessary

class CreateBill {
    process = async (req, res) => {
        try {
            const { customerId, period } = req.body;

            // Fetch transaction data from the database
            const transactionData = await Transaction.findOne({
                where: {
                    customerId: customerId,
                    period: period,
                },
            });
            console.log("🚀 ~ transactionData:", transactionData)
            if (!transactionData) {
                throw new Error("No transaction found");
            }

            // Convert transactionData.period (e.g., "2024-09") to "AUGUST 2024"
            const monthNames = [
                "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];

            const [year, month] = transactionData.period.split("-");
            const monthName = monthNames[parseInt(month, 10) - 1];
            const formattedPeriod = `${monthName} ${year}`;

            // Calculate the current period total amount
            const currentPeriodTotalAMount =
                transactionData.totalDeliveries * transactionData.agreedRate;

            // Convert image to Base64 string
            const imgPath = path.join(__dirname, '../../assets/qrcode.jpeg'); // Adjust path as necessary
            const imgBase64 = fs.readFileSync(imgPath, { encoding: 'base64' });
            const imgSrc = `data:image/jpeg;base64,${imgBase64}`;

            // HTML string with placeholders for dynamic data
            const htmlTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        font-size: 12px;
      }
      .container {
        width: 80%;
        margin: 20px auto;
        margin-top: 70px;
        padding: 20px;
        border: 1px solid #000;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        position: relative; /* Add relative positioning to the container */
      }
      .header {
        text-align: center;
        margin-bottom: 5px;
        padding-top:5px;
      }
      .header h1 {
        font-size: 25px;
      }
      .logo-box {
        position: absolute;
        top: 5px; /* Adjust as necessary to align with the content */
        left: 5px; /* Adjust as necessary to align with the content */ /* Border for the logo box */
        background-color: #fff; /* Background to make it stand out */
      }
      .logo-box img {
        max-width: 80px; /* Adjust the logo size as needed */
        height: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
        border: 1px solid black;
      }
      table th,
      table td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
      }
      .terms,
      .bank-details {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid black;
      }
      .bank-details {
        overflow: hidden;
      }
      .bank-info {
        width: 65%;
        float: left;
      }
      .qr-code {
        width: 30%;
        float: right;
        text-align: center;
        padding-top: 10px;
      }
      .qr-code img {
        max-width: 135px;
        height: auto;
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo-box">
        <img src="https://business-management-storage-bucket.s3.ap-south-1.amazonaws.com/new3.jpg" alt="Company Logo" />
      </div>
      <div class="header">
        <h1>Pooja Beverages</h1>
        <p>Shop.no:09, Indira Udyog Centre, Golani Naka, Waliv, Vasai East - 401208</p>
        <p>Mob: 9890553865, 9766559208</p>
      </div>
      <table>
        <thead>
          <tr>
            <th colspan="5" style="text-align: left">Bill Id: ${transactionData.id}</th>
          </tr>
          <tr>
            <th colspan="5" style="text-align: left">Name of Person/Organization: ${transactionData.customerName}</th>
          </tr>
          <tr>
            <th colspan="5" style="text-align: left">Period: ${formattedPeriod}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20 L Packaged Drinking Water</td>
            <td>${transactionData.totalDeliveries}</td>
            <td>₹${transactionData.agreedRate}</td>
            <td>₹${currentPeriodTotalAMount}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align:right;">Previous balance</td>
            <td>₹${transactionData.previousBalance}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align:right;">Total Amount Due</td>
            <td><b>₹${transactionData.totalAmount}</b></td>
          </tr>
        </tbody>
      </table>
      <div class="bank-details">
        <div class="bank-info">
          <h2 style="text-align: center; font-size: 15px;"><b>Bank Details</b></h2>
          <p><b>A/C Name</b>: Pooja Beverages</p>
          <p><b>Bank Name</b>: HDFC BANK, Vasai Evershine City</p>
          <p><b>A/C Number</b>: 50200095189272</p>
          <p><b>IFSC</b>: HDFC0000038</p>
          <p><b>UPI-ID</b>: 9766559208@pz</p>
        </div>
        <div class="qr-code">
          <img src="https://business-management-storage-bucket.s3.ap-south-1.amazonaws.com/QR.jpg" />
          <p>Scan QR code to pay</p>
        </div>
      </div>
      <div class="terms">
        <i>
          <h3><b>Terms and Conditions:</b></h3>
          <p>• E & O.E.</p>
          <p>• Do not damage the jars provided.</p>
          <p>• Please clear all dues as early as possible.</p>
        </i>
      </div>
    </div>
  </body>
</html>


`;

            // Generate the PDF file path in a temporary directory
            const fileName = `${customerId}_${transactionData.customerName.replace(
                / /g,
                "_"
            )}_${formattedPeriod}.pdf`;
            const filePath = path.join(os.tmpdir(), fileName);

            // Convert the HTML string to a PDF and store it in the temporary directory
            pdf.create(htmlTemplate).toFile(filePath, (err, result) => {
                if (err) {
                    throw err;
                }

                // Read the PDF file and send it as response
                const pdfBuffer = fs.readFileSync(filePath);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename=${fileName}`
                );
                res.send(pdfBuffer);

                // Optionally, delete the file after sending it
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting temporary file:", err);
                    }
                });
            });
        } catch (error) {
            console.log("🚀 ~ error:", error);
            res.status(400).send({ error: error.message });
        }
    };
}

module.exports = new CreateBill();
