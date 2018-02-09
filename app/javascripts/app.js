import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import invoice_artifacts from '../../build/contracts/Invoice.json'
var Invoice = contract(invoice_artifacts);

var account,accounts;
var log = document.getElementById("log");
window.App = {
  start: function() {
    var self = this;

    Invoice.setProvider(web3.currentProvider);
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      console.log(accounts);
      account = accounts[0];

    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  addInvoiceSupplierToLog: function(invoiceId) {
    var self = this;
    var inv;
    Invoice.deployed().then(function(instance) {
      inv = instance;
      return inv.getSupplierGstn(invoiceId, {from: account});
    }).then(function(value) {
      console.log(invoiceId+" "+value);
      log.innerHTML += "Invoice"+invoiceId+" :Supplier GSTN "+value.valueOf()+"<br>";
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting data; see log.");
    });
  },

  addInvoiceCustomerToLog: function(invoiceId) {
    var self = this;
    var inv;
    Invoice.deployed().then(function(instance) {
      inv = instance;
      return inv.getCustomerGstn(invoiceId, {from: account});
    }).then(function(value) {
      var log = document.getElementById("log");
      console.log(value);
      log.innerHTML += "Invoice"+invoiceId+" :Customer GSTN "+value.valueOf()+"<br>";
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendInvoice: function() {
    var self = this;
    // var invoiceDetail = [];
    // var supplierDetail = [];
    // var customerDetail = [];
    var amountDetail = [];
    var supplierGstn = document.getElementById("supplierGstn").value;
    var state = document.getElementById("state").value;
    var pan = document.getElementById("pan").value;
    var invoiceNo = document.getElementById("invoiceNo").value;
    var invoiceDate = document.getElementById("invoiceDate").value;
    var referenceNo = document.getElementById("referenceNo").value;
    var customerGstn = document.getElementById("customerGstn").value;
    var customerName = document.getElementById("customerName").value;
    var billingAddress = document.getElementById("billingAddress").value;
    var shippingAddress = document.getElementById("shippingAddress").value;
    var taxableAmount = document.getElementById("taxableAmount").value;
    var totalTax = document.getElementById("totalTax").value;
    var invoiceTotal = document.getElementById("invoiceTotal").value;
    // supplierDetail.push(document.getElementById("supplierGstn").value);
    // supplierDetail.push(document.getElementById("state").value);
    // supplierDetail.push(document.getElementById("pan").value);
    //
    // invoiceDetail.push(document.getElementById("invoiceNo").value);
    // invoiceDetail.push(document.getElementById("invoiceDate").value);
    // invoiceDetail.push(document.getElementById("referenceNo").value);
    //
    // customerDetail.push(document.getElementById("customerGstn").value);
    // customerDetail.push(document.getElementById("customerName").value);
    // customerDetail.push(document.getElementById("billingAddress").value);
    // customerDetail.push(document.getElementById("shippingAddress").value);
    //
    // amountDetail.push(parseInt(document.getElementById("taxableAmount").value));
    // amountDetail.push(parseInt(document.getElementById("totalTax").value));
    // amountDetail.push(parseInt(document.getElementById("invoiceTotal").value));

    this.setStatus("Initiating transaction... (please wait)");

    var inv;
    // Invoice.deployed().then(function(instance) {
    //   inv = instance;
    //   return inv.createInvoice(supplierGstn,state,pan,customerGstn,customerName,billingAddress,shippingAddress,invoiceNo,invoiceDate,referenceNo,taxableAmount,totalTax,invoiceTotal,{from: account});
    // }).then(function() {
    //   self.setStatus("Transaction complete!");
    //    self.addInvoiceSupplierToLog(invoiceId);
    //    self.addInvoiceCustomerToLog(invoiceId);
    // }).catch(function(e) {
    //   console.log(e);
    //   self.setStatus("Error sending coin; see log.");
    // });
    Invoice.deployed().then(function(instance) {
      inv = instance;
      return inv.createInvoice(supplierGstn,customerGstn,invoiceNo,"hash1",{from: account});
    }).then(function() {
      self.setStatus("Transaction complete!");
       self.addInvoiceSupplierToLog(invoiceNo);
       self.addInvoiceCustomerToLog(invoiceNo);
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};



window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  // if (typeof web3 !== 'undefined') {
  //   console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
  //   // Use Mist/MetaMask's provider
  //   window.web3 = new Web3(web3.currentProvider);
  // } else {
  //   console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // }
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  App.start();
});
