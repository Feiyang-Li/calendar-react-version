// this file is temperary attach to the main in order to dev testing
//   must remove it when actually running the program
import { LocalStorage } from "../../store/localStore.js";

export function mainTest() {
  const lolStore = new LocalStorage({
    name: String,
    age: Number,
    height: Number,
  });
  // Save some records
  lolStore.savingItems({ name: "Alice", age: 25, height: 5.6 });
  lolStore.savingItems({ name: "Bob", age: 30, height: 6.1 });

//   // Read them back
//   console.log("All records:", lolStore.extractAll());
//   console.log("Find by id=1:", lolStore.extractItems(1));
//   console.log("Filter age=30:", lolStore.extractOnParameters({ age: 30 }));
}
