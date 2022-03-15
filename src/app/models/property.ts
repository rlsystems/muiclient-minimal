export interface Property {
    id: string;
    name: string;
    description: string;
    bookingConfigurationOption: BookingConfigurationOption;

  }


  export interface BookingConfigurationOption {
    id: number;
    name: string;
    description: string;

  }