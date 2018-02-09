pragma solidity ^0.4.17;

contract Invoice {
  address public owner;

  struct InvoiceData{
    string sgstn;
    string cgstn;
    string invoiceHash;
    /* string state;
    string pan; */
    /* string name;
    string billingAddress;
    string shippingAddress;
    string invoiceNo;
    string invoiceDate;
    int taxableAmount;
    int totalTax;
    int invoiceTotal; */

  }
  mapping (string => InvoiceData) invoiceMap;
  /* mapping (string => string) supplierGSTN;
  mapping (string => string) customerGSTN; */

  function Invoice() public{
    owner = msg.sender;
  }
  /* function createInvoice(string invoiceId, bytes32[] supplierDetail, bytes32[] customerDetail, bytes32[] invoiceDetail, int[] amountDetail) public {
    suppliers[invoiceId] = Supplier(supplierDetail[0],supplierDetail[1],supplierDetail[2]);
    customers[invoiceId] = Customer(customerDetail[0],customerDetail[1],customerDetail[2],customerDetail[3]);
    invoices[invoiceId] = InvoiceInfo(invoiceDetail[0],invoiceDetail[1],invoiceDetail[2]);
    amounts[invoiceId] = Amount(amountDetail[0],amountDetail[1],amountDetail[2]);
  } */

  /* function createInvoice(string GSTN,string STATE, string PAN, string CGSTN,string NAME,string BILLADD, string SHIPADD,string INVNO, string INVDATE, string REF, int TA, int TT, int IT) public {
    invoiceMap[INVNO].sgstn = GSTN;
    invoiceMap[INVNO].state = STATE;
    invoiceMap[INVNO].pan = PAN;

    invoiceMap[INVNO].cgstn = CGSTN;
    invoiceMap[INVNO].name = NAME;
    invoiceMap[INVNO].billingAddress = BILLADD;
    invoiceMap[INVNO].shippingAddress = SHIPADD;

    invoiceMap[INVNO].invoiceNo = INVNO;
    invoiceMap[INVNO].invoiceDate = INVDATE;
    invoiceMap[INVNO].referenceNo = REF;

    invoiceMap[INVNO].taxableAmount = TA;
    invoiceMap[INVNO].totalTax = TT;
    invoiceMap[INVNO].invoiceTotal = IT;
    /* supplierGSTN[INVNO] = GSTN;
    customerGSTN[INVNO] = CGSTN;
  } */

  function createInvoice(string GSTN, string CGSTN,string INVNO,string INVHASH) public {
    invoiceMap[INVNO] = InvoiceData(GSTN, CGSTN, INVHASH);
    /* supplierGSTN[INVNO] = GSTN;
    customerGSTN[INVNO] = CGSTN; */
  }

  function getSupplierGstn(string invoiceId) public constant returns (string) {
    return invoiceMap[invoiceId].sgstn;
  }
  function getCustomerGstn(string invoiceId) public constant returns (string) {
    return invoiceMap[invoiceId].cgstn;
  }
}
