const prompt = require('prompt-sync')();
const trips = [
    {
        id: 1,
        departure: "Safi",
        destination: "Youssoufia",
        departureTime: "07:30",
        arrivalTime: "08:30",
        price: 25,
        availableSeats: 50
    },
    {
        id: 2,
        departure: "Safi",
        destination: "Marrakech",
        departureTime: "08:00",
        arrivalTime: "10:30",
        price: 90,
        availableSeats: 50
    },
    {
        id: 3,
        departure: "Safi",
        destination: "Casablanca",
        departureTime: "09:00",
        arrivalTime: "13:00",
        price: 140,
        availableSeats: 50
    },
    {
        id: 4,
        departure: "Youssoufia",
        destination: "Marrakech",
        departureTime: "09:15",
        arrivalTime: "11:00",
        price: 65,
        availableSeats: 50
    },
    {
        id: 5,
        departure: "Youssoufia",
        destination: "Casablanca",
        departureTime: "10:00",
        arrivalTime: "13:30",
        price: 110,
        availableSeats: 50
    },
    {
        id: 6,
        departure: "Marrakech",
        destination: "Casablanca",
        departureTime: "11:30",
        arrivalTime: "14:30",
        price: 120,
        availableSeats: 50
    },
    {
        id: 7,
        departure: "Marrakech",
        destination: "Rabat",
        departureTime: "12:00",
        arrivalTime: "16:00",
        price: 150,
        availableSeats: 50
    },
    {
        id: 8,
        departure: "Casablanca",
        destination: "Rabat",
        departureTime: "14:00",
        arrivalTime: "15:15",
        price: 40,
        availableSeats: 50
    },
    {
        id: 9,
        departure: "Casablanca",
        destination: "Kenitra",
        departureTime: "15:00",
        arrivalTime: "16:45",
        price: 55,
        availableSeats: 50
    },
    {
        id: 10,
        departure: "Rabat",
        destination: "Kenitra",
        departureTime: "16:00",
        arrivalTime: "16:45",
        price: 30,
        availableSeats: 50
    },
    {
        id: 11,
        departure: "Rabat",
        destination: "Fes",
        departureTime: "17:00",
        arrivalTime: "19:30",
        price: 95,
        availableSeats: 50
    },
    {
        id: 12,
        departure: "Kenitra",
        destination: "Fes",
        departureTime: "17:30",
        arrivalTime: "20:00",
        price: 85,
        availableSeats: 50
    },
    {
        id: 13,
        departure: "Fes",
        destination: "Meknes",
        departureTime: "08:30",
        arrivalTime: "09:20",
        price: 35,
        availableSeats: 50
    },
    {
        id: 14,
        departure: "Fes",
        destination: "Oujda",
        departureTime: "10:00",
        arrivalTime: "13:30",
        price: 130,
        availableSeats: 50
    },
    {
        id: 15,
        departure: "Meknes",
        destination: "Rabat",
        departureTime: "11:00",
        arrivalTime: "13:30",
        price: 80,
        availableSeats: 50
    },
    {
        id: 16,
        departure: "Meknes",
        destination: "Casablanca",
        departureTime: "12:00",
        arrivalTime: "15:00",
        price: 105,
        availableSeats: 50
    },
    {
        id: 17,
        departure: "Casablanca",
        destination: "El Jadida",
        departureTime: "16:30",
        arrivalTime: "18:00",
        price: 50,
        availableSeats: 50
    },
    {
        id: 18,
        departure: "El Jadida",
        destination: "Safi",
        departureTime: "18:30",
        arrivalTime: "20:30",
        price: 60,
        availableSeats: 50
    },
    {
        id: 19,
        departure: "Marrakech",
        destination: "Agadir",
        departureTime: "15:00",
        arrivalTime: "18:30",
        price: 100,
        availableSeats: 50
    },
    {
        id: 20,
        departure: "Agadir",
        destination: "Safi",
        departureTime: "19:00",
        arrivalTime: "22:00",
        price: 95,
        availableSeats: 50
    }
];



const tickets = [];
let nextTicketId = 1;
//fonction pour afficher les trajets =================================================

function afficherTrajets(trips) {
    console.log("\n=== TRAJETS DISPONIBLES ===\n");
    if (trips.length === 0) {
        console.log("Aucun trajet trouvé.\n");
        return;
    }
    trips.forEach(trip => {
        console.log(`#${trip.id} ${trip.departure} → ${trip.destination}`);
        console.log(`Départ : ${trip.departureTime}`);
        console.log(`Arrivée : ${trip.arrivalTime}`);
        console.log(`Prix : ${trip.price} DH`);
        console.log(`Places disponibles : ${trip.availableSeats}\n`);
    });
}
// fonction pour achter un ticket =======================================================
function acheterTicket() {
    let nom = prompt("Nom : ");
    let id = Number(prompt("Id du trajet : "));
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            if (trips[i].availableSeats === 0) {
                console.log("Train complet");
                return;
            }
            // chercher le premier siège libre
            let seat = 1;
            for (let j = 0; j < tickets.length; j++) {
                if (tickets[j].tripId === trips[i].id &&
                    tickets[j].seatNumber === seat) {
                    seat++;
                    j = -1;
                }
            }
            let ticket = {
                id: nextTicketId,
                passengerName: nom,
                tripId: trips[i].id,
                seatNumber: seat,
                price: trips[i].price
            };
            tickets.push(ticket);
            nextTicketId++;
            trips[i].availableSeats--;
            console.log("Ticket acheté avec succès");
            console.log(ticket);
            return;
        }
    }

    console.log("Trajet introuvable");
}
// fonction pour  afficher les tickets ========================================================
function afficherTickets(list = tickets) {
    console.log("\n=== TICKETS ===\n");

    if (list.length === 0) {
        console.log("Aucun ticket enregistré.\n");
        return;
    }

    list.forEach(ticket => {

        let trip = null;

        for (let i = 0; i < trips.length; i++) {
            if (trips[i].id === ticket.tripId) {
                trip = trips[i];
                break;
            }
        }

        console.log(`Ticket #${ticket.id}`);
        console.log(`Passager : ${ticket.passengerName}`);

        if (trip !== null) {
            console.log(`Trajet : ${trip.departure} → ${trip.destination}`);
        } else {
            console.log(`Trajet : Trajet inconnu`);
        }

        console.log(`Place : ${ticket.seatNumber}`);
        console.log(`Prix : ${ticket.price} DH\n`);
    });
}
//fonction pour annuler ticket =================================================
function annulerTicket() {

    const ticketId = parseInt(prompt("Identifiant du ticket : "));

    let index = -1;

    for (let i = 0; i < tickets.length; i++) {

        if (tickets[i].id === ticketId) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        console.log("Ticket introuvable.");
        return;
    }
    const ticket = tickets[index];

    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === ticket.tripId) {
            trips[i].availableSeats++;
            break;
        }
    }
    tickets.splice(index, 1);

    console.log("\nTicket annulé avec succès.\n");
}
//fonction pour rechercher  a un ticket =============================================
function rechercherTicket() {
    const name = prompt("Nom du passager : ");
    let result = [];
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].passengerName.toLowerCase().includes(name.toLowerCase())) {
            result.push(tickets[i]);
        }
    }
    if (result.length === 0) {
        console.log("\nAucun ticket trouvé pour ce passager.\n");
        return;
    }
    afficherTickets(result);
}
//fonction pour filtre les trajets =====================================================
function filtrerTrajets() {

    const ville = prompt("Ville de départ : ");

    let result = [];

    for (let i = 0; i < trips.length; i++) {

        if (trips[i].departure.toLowerCase() === ville.toLowerCase()) {
            result.push(trips[i]);
        }
    }

    console.log("\nRésultat :\n");

    if (result.length === 0) {
        console.log("Aucun trajet trouvé pour cette ville.\n");
        return;
    }

    for (let i = 0; i < result.length; i++) {
        console.log(
            `${result[i].departure} → ${result[i].destination} : ${result[i].price} DH`
        );
    }

    console.log("");
}
// fonction pour trier les trajets par prix
function trierTrajets() {
    const sorted = [...trips].sort((a, b) => a.price - b.price);

    console.log("\n=== TRAJETS TRIÉS PAR PRIX CROISSANT ===\n");

    sorted.forEach(t => {
        console.log(`${t.departure} → ${t.destination} : ${t.price} DH`);
    });

    console.log("");
}