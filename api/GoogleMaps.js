export const fetchReverseGeocoding = async (lat, long) => {
    try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo`)
        const data = await res.json()
        return data
    }
    catch {
        console.log("Error with API call.")
    }
}