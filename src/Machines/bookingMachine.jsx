import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../utils/api";

console.log();
const fillCountries = {
    initial: "loading",
    states: {
        loading: {
            invoke: {
                id: 'getCountries',
                src: fromPromise(() => fetchCountries()),
                onDone: {
                    target: 'success',
                    actions: assign(
                        ({context, event}) => context.countries = event.output
                    )
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        error: 'Fallo el request',
                    })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: { target: "loading" },
            },
        },
    },
};



const bookingMachine = createMachine({
    id: "buy plane tickets",
    initial: "initial",
    context: {
        passengers: [],
        selectedCountry: '',
        countries: [],
        error: ''
    },
    states: {
        initial: {
            on: {
                START: "search"
            }
        },
        search: {
            on: {
                CONTINUE: {
                    target: "passengers",
                    actions: assign({
                        selectedCountry: ({event}) => event.selectedCountry
                    })
                },
                CANCEL: "initial"
            },
            ...fillCountries
        },
        passengers: {
            on: {
                DONE: "tickets",
                CANCEL: "initial",
                ADD: {
                    actions: assign({
                        passengers: ({ context, event }) => [
                            ...context.passengers,
                            event.newPassenger
                        ]
                    })
                }
            },
        },
        tickets: {
            after: {
                5000: {
                    target: "initial",
                    actions: "clean"
                }
            },
            on: {
                FINISH: {
                    target: "initial",
                    actions: "clean"
                }
            }
        }
    }
},
{
    actions: {
        clean: assign((context) => { 
            context.passengers = []; 
            context.selectedCountry = ''; 
            return context
        })
    } ,
    guards: {
        moreThanOnePassenger: ({context}) => {
            return context.passengers.length > 0
        }
    }

}




);

export default bookingMachine;





