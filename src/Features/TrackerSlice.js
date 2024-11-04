const initialState = {
  trackers: [],
  error: null,
};

function calcuclateSum(type, amt, tracker, opt = "add") {
  const newTracker = { ...tracker };
  const amount = Number(amt);

  if (amount < 0) {
    alert("Please provide a valid amount");
    return;
  }
  if (type === "expense") {
    newTracker.totalExpense =
      opt === "add"
        ? newTracker.totalExpense + amount
        : newTracker.totalExpense - amount;
  } else if (type === "loss") {
    newTracker.totalLoss =
      opt === "add"
        ? newTracker.totalLoss + amount
        : newTracker.totalLoss - amount;
  } else if (type === "profit") {
    newTracker.totalProfit =
      opt === "add"
        ? newTracker.totalProfit + amount
        : newTracker.totalProfit - amount;
  }

  newTracker.netTotal =
    newTracker.totalProfit -
    Math.abs(newTracker.totalExpense + newTracker.totalLoss);

  newTracker.lastModified = Date.now();

  return newTracker;
}

export default function trackerSlice(state = initialState, action) {
  switch (action.type) {
    case "tracker/addNewItem": {
      const {
        trackerName,
        transactionName,
        type,
        category,
        date,
        amount,
        description,
      } = action.payload;

      const trackerIndex = state.trackers.findIndex(
        (item) => item.name === trackerName
      );

      if (trackerIndex === -1) {
        alert("Tracker not found. Try again");
        return { ...state };
      }
      const tracker = state.trackers[trackerIndex];

      const randomId = Math.round(Math.random() * 40000);
      const newItemObj = {
        _id: randomId,
        name: transactionName,
        type,
        category,
        date,
        amount,
        description,
      };
      let updatedTracker = {
        ...tracker,
        transactions: [...tracker.transactions, newItemObj],
      };
      updatedTracker = calcuclateSum(type, amount, updatedTracker);

      return {
        ...state,
        trackers: [
          ...state.trackers.slice(0, trackerIndex),
          updatedTracker,
          ...state.trackers.slice(trackerIndex + 1),
        ],
      };
    }
    case "tracker/addNewTracker": {
      const { name, nameOfTheMonth } = action.payload;

      const hasSameName = state.trackers.some(
        (trackerItem) => trackerItem.name === name
      );

      if (hasSameName) {
        alert("Cannot create multiple trackers with same name. Try Again");
        return { ...state };
      }

      return {
        ...state,
        error: null,
        trackers: [
          ...state.trackers,
          {
            name,
            nameOfTheMonth,
            transactions: [],
            lastModified: Date.now(),
            totalProfit: 0,
            totalExpense: 0,
            totalLoss: 0,
            netTotal: 0,
            isSaved: false,
          },
        ],
      };
    }
    case "tracker/updateTracker": {
      const { name, nameOfTheMonth, oldName, oldNameOfTheMonth } =
        action.payload;

      const updatedTrackers = state.trackers.map((trackerItem) => {
        return {
          ...trackerItem,
          name: trackerItem.name === oldName ? name : trackerItem.name,
          nameOfTheMonth:
            trackerItem.nameOfTheMonth === oldNameOfTheMonth
              ? nameOfTheMonth
              : trackerItem.nameOfTheMonth,
          lastModified: Date.now(),
        };
      });
      return {
        ...state,
        trackers: updatedTrackers,
      };
    }

    case "tracker/removeTracker": {
      const { itemName } = action.payload;

      return {
        ...state,
        trackers: state.trackers.filter((item) => item.name !== itemName),
      };
    }
    case "tracker/removeItem": {
      const { trackerName, itemId, type, amount } = action.payload;

      const trackers = state.trackers;

      const selectedTrackerIndex = trackers.findIndex(
        (item) => item.name === trackerName
      );
      const currTracker = trackers[selectedTrackerIndex];

      console.log(currTracker);
      let updatedCurrTracker = {
        ...currTracker,
        transactions: currTracker.transactions.filter(
          (item) => item._id !== itemId // Filter out the item with the given ID
        ),
      };

      updatedCurrTracker = calcuclateSum(
        type,
        amount,
        updatedCurrTracker,
        "remove"
      );

      const updatedTrackers = trackers.map((item) =>
        item.name === trackerName ? updatedCurrTracker : item
      );
      console.log(updatedTrackers);

      return {
        ...state,
        trackers: updatedTrackers,

        // trackers: state.trackers.filter((item) => item.name !== itemName),
      };
    }

    case "tracker/updateItem": {
      const {
        trackerName,
        transactionId,
        prevType,
        prevAmt,
        type,
        category,
        date,
        amount,
        description,
      } = action.payload;

      const trackerIndex = state.trackers.findIndex(
        (item) => item.name === trackerName
      );

      if (trackerIndex === -1) {
        alert("Tracker not found. Try again");
        return { ...state };
      }

      // Get the tracker and find the transaction to update
      let tracker = state.trackers[trackerIndex];

      // removes the amount from previous calculations either types are changed or not

      tracker = calcuclateSum(prevType, prevAmt, tracker, "remove");

      const transactionIndex = tracker.transactions.findIndex(
        (item) => item._id === transactionId
      );

      if (transactionIndex === -1) {
        alert("Transaction with the specified ID does not exist.");
        return { ...state };
      }
      const currTransaction = tracker.transactions[transactionIndex];
      // Create the updated transaction with only modified fields
      const updatedTransaction = {
        ...currTransaction,
        ...(type !== undefined && { type }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(amount !== undefined && { amount }),
        ...(description !== undefined && { description }),
      };

      // Create a new transactions array with the updated transaction
      const updatedTransactions = tracker.transactions.map((item, index) =>
        index === transactionIndex ? updatedTransaction : item
      );

      // Create the updated tracker with the new transactions array
      let updatedTracker = {
        ...tracker,
        transactions: updatedTransactions,
      };

      updatedTracker = calcuclateSum(type, amount, updatedTracker);

      // Create the updated trackers array with the modified tracker
      const updatedTrackers = state.trackers.map((item, index) =>
        index === trackerIndex ? updatedTracker : item
      );

      // Return the new state with the updated trackers array
      return {
        ...state,
        trackers: updatedTrackers,
      };
    }

    case "tracker/saveTraker": {
      const { trackerName } = action.payload;
      return {
        ...state,
        trackers: state.trackers.map((item) =>
          item.name === trackerName ? { ...item, isSaved: true } : item.isSaved
        ),
      };
    }

    default:
      return state;
  }
}

export function addNewTracker(dataObj) {
  return { type: "tracker/addNewTracker", payload: dataObj };
}
export function removeTracker(dataObj) {
  return { type: "tracker/removeTracker", payload: dataObj };
}
export function updateTracker(dataObj) {
  return { type: "tracker/updateTracker", payload: dataObj };
}

export function addNewItem(dataObj) {
  return { type: "tracker/addNewItem", payload: dataObj };
}
export function removeItem(dataObj) {
  return { type: "tracker/removeItem", payload: dataObj };
}
export function updateItem(dataObj) {
  return { type: "tracker/updateItem", payload: dataObj };
}
