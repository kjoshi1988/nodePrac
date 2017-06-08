
var API = (function () {
    /**
     * default config
     *
     * @type {{fetchData: defaultConfig.fetchData, proceedFn: defaultConfig.proceedFn}}
     */
    var defaultConfig = {
        fetchData: function () {
            return {
                billing_address: " ada sdasd sad asda",
                products: [
                    {name: "A", qty: 1, price: "100", discount: "10"},
                    {name: "B", qty: 2, price: "100", discount: "10"},
                    {name: "C", qty: 1, price: "100", discount: "10"},
                    {name: "D", qty: 1, price: "100", discount: "10"}
                ],
                currency: "$",
                billingAddress: "XY-24, Rajapuri road, banglore"
            };
        },
        proceedFn: function (totalPrice, totalDiscount) {
            alert(`totalPrice: ${totalPrice}, totalDiscount: ${totalDiscount}`);
        }
    };

    /**
     * Creates a cart row
     *
     * @param currency
     * @param cellData
     * @param rowCount
     * @returns {Element}
     */
    function createCartRow(currency, cellData, rowCount) {
        var row = document.createElement("div");
        var discount = (cellData.price * cellData.discount) / 100;
        var finalPrice = (cellData.price - discount) * cellData.qty;
        row.className = "table-row";

        row.innerHTML = `
                    <div class="table-cell"><div data-index="${rowCount}" class="remove">-</div><span>${rowCount + 1}</span></div>
                    <div class="table-cell">${cellData.name}</div>
                    <div class="table-cell">${cellData.qty}</div>
                    <div class="table-cell">${currency} ${cellData.price}</div>
                    <div class="table-cell">${cellData.discount}</div>
                    <div class="table-cell">${currency} ${finalPrice}</div>
                `;
        row.__finalPrice = finalPrice;
        row.__discount = discount;

        return row;
    }

    /**
     * Reset all the next sibling rows when an item is removed.
     *
     * @param next
     */
    function resetRows(next) {
        if (next) {
            var sno = next.children[0];
            var index = parseInt(sno.children[1].innerHTML) - 1;
            sno.children[0].setAttribute("data-index", index - 1);
            sno.children[1].innerHTML = index;
            resetRows(next.nextElementSibling);
        }
    }

    /**
     * Renders billing , total price, discount and proceed components
     *
     * @param currency
     * @param address
     * @param totalPrice
     * @param totalDiscount
     * @returns {{bottomSection: Element, updateHandler: updateHandler}} , updateHandler which will be called whenever a row is added or deleted.
     */
    function renderBottomSection(currency, address, totalPrice, totalDiscount) {
        var bottomSection = document.createElement("div");
        bottomSection.className = "bottom-section";

        var billingAddress = document.createElement("div");
        billingAddress.className = "bottom-col billingAddress";
        billingAddress.innerHTML = address;

        var cartOptions = document.createElement("div");
        cartOptions.className = "bottom-col cartOptions";

        var discount = document.createElement("div");
        discount.className = "col totalDiscount";
        discount.innerHTML = `Total Discount: ${currency} ${totalDiscount}`;

        var price = document.createElement("div");
        price.className = "col totalPrice";
        price.innerHTML = `Total Price: ${currency} ${totalPrice}`;

        cartOptions.appendChild(discount);
        cartOptions.appendChild(price);

        bottomSection.appendChild(billingAddress);
        bottomSection.appendChild(cartOptions);

        return {
            bottomSection: bottomSection, updateHandler: function (totalDiscount, totalPrice) {
                price.innerHTML = `Total Price: ${currency} ${totalPrice}`;
                discount.innerHTML = `Total Discount: ${currency} ${totalDiscount}`;
            }
        };
    }

    /**
     * Init the cart api, returns addProduct option.
     */
    return {
        init: function (parent, config) {
            config = config || defaultConfig;
            config.fetchData = config.fetchData || defaultConfig.fetchData;
            config.proceedFn = config.proceedFn || defaultConfig.proceedFn;


            var cartData = config.fetchData();
            var rowData;
            var table, totalPrice = 0, totalDiscount = 0;

            table = document.createElement("div");
            table.className = "table";
            table.innerHTML = `
                        <div class="table-row table-head">
                            <div class="table-cell">S.No.</div>
                            <div class="table-cell">Product</div>
                            <div class="table-cell">Qty</div>
                            <div class="table-cell">Price</div>
                            <div class="table-cell">Discount(%)</div>
                            <div class="table-cell">Amount</div>
                        </div>
                    `;
            parent.appendChild(table);

            for (var i = 0; i < cartData.products.length; i++) {
                rowData = createCartRow(cartData.currency, cartData.products[i], i);
                table.appendChild(rowData);
                totalPrice += rowData.__finalPrice;
                totalDiscount += rowData.__discount;
            }

            var cartOptions = renderBottomSection(cartData.currency, cartData.billingAddress, totalPrice, totalDiscount);
            parent.appendChild(cartOptions.bottomSection);

            var proceed = document.createElement("div");
            proceed.className = "button proceed";
            proceed.innerHTML = "Proceed";
            parent.appendChild(proceed);
            proceed.addEventListener("click", function () {
                if (config.proceedFn) {
                    config.proceedFn(cartData.currency + " " + totalPrice, cartData.currency + " " + totalDiscount);
                }
            });

            table.addEventListener("click", function (e) {
                if (e.target && e.target.className === "remove") {
                    var index = parseInt(e.target.getAttribute("data-index"));
                    var rowToRemove = table.children[index + 1];
                    resetRows(rowToRemove.nextElementSibling);
                    rowToRemove.parentNode.removeChild(rowToRemove);
                    totalPrice -= rowToRemove.__finalPrice;
                    totalDiscount -= rowToRemove.__discount;
                    cartOptions.updateHandler(totalDiscount, totalPrice);
                }
            }, false);

            return {
                addProduct: function (products) {
                    var row = createCartRow(cartData.currency, products, table.children.length - 1);
                    table.appendChild(row);
                    totalPrice += row.__finalPrice;
                    totalDiscount += row.__discount;
                    cartOptions.updateHandler(totalDiscount, totalPrice);
                }
            }
        }
    }
})();