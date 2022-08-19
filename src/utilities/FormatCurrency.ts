const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
})

function FormatCurrency(number: number) {
    return (
        CURRENCY_FORMATTER.format(number)
    )
}

export default FormatCurrency