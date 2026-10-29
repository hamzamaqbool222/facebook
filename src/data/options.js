export const VEHICLE_TYPES = [
  "Car/Truck",
  "Motorcycle",
  "Powersport",
  "RV/Camper",
  "Trailer",
  "Boat",
  "Commercial/Industrial",
  "Other",
];

export const YEARS = Array.from({ length: 2027 - 1900 }, (_, index) => String(2027 - index));

export const MAKES = [
  "Acura",
  "Alfa Romeo",
  "AM General",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Freightliner",
  "Genesis",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "International",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Karma",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lucid",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Plymouth",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Other",
];

export const BODY_STYLES = [
  "Sedan",
  "Truck",
  "SUV",
  "Coupe",
  "Convertible",
  "Hatchback",
  "Wagon",
  "Minivan",
  "Small Car",
  "Other",
];

export const COLORS = [
  "Black",
  "Blue",
  "Brown",
  "Gold",
  "Green",
  "Gray",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "White",
];

export const FUEL_TYPES = ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"];

export const TRANSMISSIONS = ["Automatic transmission", "Manual transmission"];

export const CONDITIONS = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

export const CITIES = [
  "Redding",
  "Redding, CA",
  "Anderson, CA",
  "Shasta Lake, CA",
  "Sacramento, CA",
  "San Francisco, CA",
  "San Jose, CA",
  "Oakland, CA",
  "Los Angeles, CA",
  "San Diego, CA",
  "Fresno, CA",
  "Portland, OR",
  "Seattle, WA",
  "Phoenix, AZ",
  "Las Vegas, NV",
  "Denver, CO",
  "Austin, TX",
  "Dallas, TX",
  "Houston, TX",
  "Chicago, IL",
  "New York, NY",
];

const WITH_EXTERIOR = new Set([
  "Car/Truck",
  "Motorcycle",
  "Powersport",
  "RV/Camper",
  "Trailer",
  "Boat",
  "Commercial/Industrial",
]);

const WITH_INTERIOR = new Set([
  "Car/Truck",
  "Powersport",
  "RV/Camper",
  "Trailer",
  "Boat",
  "Commercial/Industrial",
]);

const WITH_FUEL = new Set([
  "Car/Truck",
  "Motorcycle",
  "Powersport",
  "RV/Camper",
  "Boat",
  "Commercial/Industrial",
]);

export function fieldsFor(type) {
  return {
    makeSelect: type === "Car/Truck" || type === "Motorcycle",
    mileage: type === "Car/Truck" || type === "Motorcycle",
    body: type === "Car/Truck",
    exterior: WITH_EXTERIOR.has(type),
    interior: WITH_INTERIOR.has(type),
    cleanTitle: type === "Car/Truck",
    condition: type === "Car/Truck",
    fuel: WITH_FUEL.has(type),
    transmission: type === "Car/Truck" || type === "Motorcycle",
  };
}

export const EMPTY_FORM = {
  vehicleType: "",
  location: "Redding",
  year: "",
  make: "",
  model: "",
  mileage: "",
  price: "",
  body: "",
  exterior: "",
  interior: "",
  cleanTitle: false,
  condition: "",
  fuel: "",
  transmission: "",
  description: "",
};
