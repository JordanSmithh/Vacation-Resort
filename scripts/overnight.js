document
    .getElementById("costForm")
    .addEventListener("submit", function(event){
        event.preventDefault();

        
        const name = document.getElementById("name").value;
        const checkInDate = document.getElementById("checkInDate").value;
        const nights = parseInt(document.getElementById("nights").value);
        const roomType = document.querySelector(
            'input[name="roomType"]:checked'
        ).value;
        const discount = document.querySelector('input[name="discount"]:checked').value;
        const adults = parseInt(document.getElementById("adults").value);
        const children = parseInt(document.getElementById("children").value);

    const maxOccupany = getMaxOccupancy(roomType);
            if(adults + children > maxOccupany){
                document.getElementById("messageDiv").innerText = `The room you selected will not hold your party. Maxium occupancy for this room is ${maxOccupany}`;
                return;
            }
            document.getElementById("messageDiv").innerText = "";
            calculateCost(roomType, checkInDate, nights, discount);

    });

    function getMaxOccupancy(roomType){
        if(roomType === "queen")
            return 5;
    } else if (roomType === "king"){
            return 2;
    } else if (roomType === "suite"){
        return 6;
    }

    function getRoomRate(checkInDate, roomType){
        const date = new Date(checkInDate);
        const month = date.getMonth() + 1;

        let rate;
        if(month >= 6&& month <= 8){
            if(roomType === "queen" || roomType === "king"){
                rate = 250;
            } else if(roomType === "suite"){
                rate 350;
            }
        } else {
            if (roomType === "queen" || === "king") {
                rate = 150;
            }   else if (roomType === "suite") {
                rate = 210;
            }
        }
        return rate;
    }

    function calculateCost(roomType, checkInDate, nights, discount){
        const roomRate = getRoomRate(checkInDate, roomType);
        let totalRoomCost = roomRate * nights;

        let discountRate = 0;
        if(discount === "aaa"){
            discountrate = totalRoomCost * 0.1;
        } else if (discount === "military"){
            discountRate = totalRoomCost * 0.2;
        }
        const discountCost = totalRoomCost - discountRate;

        const tax = discountCost * 0.12;
        const totalCost = discountCost + tax;

        document.getElementById("result").innerHTML = `
        <p>Room Rate per Night: $${roomRate.toFixed(2)}</p>
        <p>Number of nights: ${nights}</p>
        <p>Discount Rate; $${discountRate.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <p><strong>Total Cost (tax included): $${totalCost.toFixed(
            2
        )}</strong></p>`
        
    }