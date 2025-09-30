// const Reservation = require('../models/Reservation');
// const Table = require('../models/Table');

// exports.createReservation = async (req, res) => {
//   try {
//     const { tableId, customerName, reservationTime, partySize } = req.body;
    
//     const table = await Table.findById(tableId);
//     if (!table || table.status !== 'available' || table.capacity < partySize) {
//       return res.status(400).json({ message: 'Table not available or insufficient capacity' });
//     }

//     const reservation = new Reservation({
//       table: tableId,
//       customerName,
//       reservationTime,
//       partySize
//     });

//     table.status = 'reserved';
//     await table.save();
//     const newReservation = await reservation.save();
//     res.status(201).json(newReservation);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getReservations = async (req, res) => {
//   try {
//     const reservations = await Reservation.find().populate('table');
//     res.json(reservations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

exports.createReservation = async (req, res) => {
  try {
    const { tableId, customerName, reservationTime, partySize } = req.body;
    
    const table = await Table.findById(tableId);
    if (!table || table.status !== 'available' || table.capacity < partySize) {
      return res.status(400).json({ message: 'Table not available or insufficient capacity' });
    }

    const reservation = new Reservation({
      table: tableId,
      customerName,
      reservationTime,
      partySize
    });

    table.status = 'reserved';
    await table.save();
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('table');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    const { tableId, customerName, reservationTime, partySize, status } = req.body;
    if (tableId && tableId !== reservation.table.toString()) {
      const oldTable = await Table.findById(reservation.table);
      const newTable = await Table.findById(tableId);
      if (!newTable || newTable.status !== 'available' || newTable.capacity < partySize) {
        return res.status(400).json({ message: 'New table not available or insufficient capacity' });
      }
      oldTable.status = 'available';
      newTable.status = 'reserved';
      await oldTable.save();
      await newTable.save();
    }

    reservation.table = tableId || reservation.table;
    reservation.customerName = customerName || reservation.customerName;
    reservation.reservationTime = reservationTime || reservation.reservationTime;
    reservation.partySize = partySize || reservation.partySize;
    reservation.status = status || reservation.status;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    const table = await Table.findById(reservation.table);
    table.status = 'available';
    await table.save();
    // await reservation.remove();
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};