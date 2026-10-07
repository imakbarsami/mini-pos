import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Invoice = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const invoiceRef = useRef(null);

    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);

    const fetchInvoice = async () => {

        try {
            const response = await api.get(`/orders/${id}`);

            if (response.data.status === 200) {
                setInvoiceData(response.data.data);
            }

        } catch (error) {
            toast.error('Failed to load invoice details.');
            navigate('/orders');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, [id, navigate]);


    const handleDownloadPDF = async () => {

        setDownloading(true);

        try {

            const element = invoiceRef.current;
            if (!element) throw new Error("Invoice element not found");

            const imgData = await toPng(element, {
                quality: 1,
                backgroundColor: '#ffffff',
                pixelRatio: 2
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            const fileName = `Invoice_${invoiceData.order_info.order_number}.pdf`;
            pdf.save(fileName);

        } catch (error) {
            console.error("PDF Generation Error: ", error);
        } finally {
            setDownloading(false);
        }
    };

    const handlePrint = () => {

        setIsPrinting(true);

        const originalTitle = document.title;
        document.title = `Invoice_${invoiceData.order_info.order_number}`;

        setTimeout(() => {

            window.print();
            document.title = originalTitle;
            setIsPrinting(false);
        }, 800);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl" />
            </div>
        );
    }

    const { order_info, customer_info, items } = invoiceData;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
            <style type="text/css" media="print">
                {`
          @page { size: A4 portrait; margin: 10mm; }
          body * { visibility: hidden; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            box-shadow: none;
            border: none;
          }
        `}
            </style>

            {/* Action Bar (Top) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 print:hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                >
                    <FiArrowLeft /> Back to Orders
                </button>

                <div className="flex gap-3">

                    {/* Custom Print Button */}
                    <button
                        onClick={handlePrint}
                        disabled={isPrinting || downloading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isPrinting ? (
                            <><AiOutlineLoading3Quarters className="animate-spin" /> Preparing...</>
                        ) : (
                            <><FiPrinter /> Print</>
                        )}
                    </button>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {downloading ? (
                            <><AiOutlineLoading3Quarters className="animate-spin" /> Generating...</>
                        ) : (
                            <><FiDownload /> Download PDF</>
                        )}
                    </button>
                </div>
            </div>

            {/* Invoice Document Layout */}
            <div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 print:shadow-none print:border-none print:m-0"
            >
                <div
                    id="printable-invoice"
                    ref={invoiceRef}
                    className="p-10 sm:p-14 bg-white text-gray-800"
                >
                    {/* Header Section */}
                    <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">MINI POS</h1>
                            <p className="text-sm text-gray-500 mt-2">123 Business Avenue, Tech Park<br />Dhaka, Bangladesh 1212<br />sami@example.com</p>
                        </div>
                        <div className="text-right">

                            <h2 className="text-3xl font-bold text-gray-300 uppercase tracking-widest mb-2">Invoice</h2>

                            <p className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                Invoice No: <span className="text-gray-800">{order_info.order_number.replace('ORD-', 'INV-')}</span>
                            </p>

                            <p className="text-sm text-gray-600 font-medium mt-1 whitespace-nowrap">
                                Order Date: <span className="text-gray-800">
                                    {
                                        new Date(order_info.order_date).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                </span>
                            </p>

                            <p className="text-sm text-gray-600 font-medium mt-1 whitespace-nowrap">
                                Paid Date: <span className="text-gray-800">
                                    {
                                        new Date(order_info.order_complete_date).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                </span>
                            </p>

                            {/* Status Box */}
                            <div className="mt-3 inline-block">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider print:border print:border-gray-300 ${order_info.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-700 print:bg-white print:text-black'
                                    : 'bg-orange-100 text-orange-700 print:bg-white print:text-black'
                                    }`}>
                                    {order_info.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info Section */}
                    <div className="mb-10">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Billed To:</h3>
                        <h4 className="text-lg font-bold text-gray-800">{customer_info.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{customer_info.phone}</p>
                        {customer_info.address && <p className="text-sm text-gray-600 mt-1">{customer_info.address}</p>}
                    </div>

                    {/* Items Table */}
                    <div className="mb-10 min-h-[250px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-800">
                                    <th className="py-3 font-semibold text-gray-800 uppercase text-xs tracking-wider">Item Description</th>
                                    <th className="py-3 font-semibold text-gray-800 uppercase text-xs tracking-wider text-center">Qty</th>
                                    <th className="py-3 font-semibold text-gray-800 uppercase text-xs tracking-wider text-right">Price</th>
                                    <th className="py-3 font-semibold text-gray-800 uppercase text-xs tracking-wider text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (

                                    <tr key={index} className="border-b border-gray-100">

                                        <td className="py-4 text-sm font-medium text-gray-700">
                                            {item.product_name}
                                        </td>

                                        <td className="py-4 text-sm text-gray-600 text-center">
                                            {item.quantity}
                                        </td>

                                        <td className="py-4 text-sm text-gray-600 text-right">
                                            ৳{parseFloat(item.unit_price).toFixed(2)}
                                        </td>

                                        <td className="py-4 text-sm font-semibold text-gray-800 text-right">
                                            ৳{parseFloat(item.line_total).toFixed(2)}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end mb-16">
                        <div className="w-full sm:w-1/2 md:w-1/3 space-y-3">

                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-800">৳{parseFloat(order_info.sub_total).toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Tax (5%)</span>
                                <span className="font-medium text-gray-800">৳{parseFloat(order_info.tax_amount).toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center border-t-2 border-gray-800 pt-3 mt-3">
                                <span className="font-bold text-gray-800 uppercase tracking-wide">Grand Total</span>
                                <span className="text-xl font-bold text-blue-600">৳{parseFloat(order_info.grand_total).toFixed(2)}</span>
                            </div>

                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="border-t border-gray-200 pt-8 flex justify-between items-end">
                        <div className="text-sm text-gray-500">
                            <p>For any inquiries, please contact sami@example.com</p>
                        </div>

                        <div className="text-center">
                            <div className="w-40 border-b-2 border-gray-800 mb-2"></div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Authorized Signature</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Invoice;