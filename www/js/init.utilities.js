// Initialize utilities
numeral.language('es', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    currency: {
        symbol: '€'
    }
});

// switch between languages
numeral.language('es');