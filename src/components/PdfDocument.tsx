import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useCalculator } from "../context/CalculatorContext";

// Register font (optional)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 12,
  },
  label: {
    fontWeight: "bold",
  },
  total: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
});

const PdfDocument = () => {
  const {
    selectedInvestment,
    hasBuildingModels,
    amenities,
    overallBuildings,
    uniqueBuildings,
    documentationType,
    needsApartmentModels,
    overallApartments,
    uniqueApartments,
    averageRooms,
    hasEnvironmentModel,
    plotDetail,
    neighborhoodDetail,
    highlightAnimation,
    filteringSorting,
    languages,
    heroAnimation,
    totalPrice,
  } = useCalculator();

  // Helper function to format option labels
  const formatOption = (value: string | boolean | number | null) => {
    if (value === null || value === undefined) return "Not selected";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value.toString();
  };

  // Format prices
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Investment Calculator Receipt</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Buildings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buildings</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Investment Type:</Text>
            <Text>{formatOption(selectedInvestment)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Has 3D Models:</Text>
            <Text>{formatOption(hasBuildingModels)}</Text>
          </View>
          {selectedInvestment === "multiple_house" ||
          selectedInvestment === "multiple_apartment" ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Overall Buildings:</Text>
                <Text>{overallBuildings}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Unique Buildings:</Text>
                <Text>{uniqueBuildings}</Text>
              </View>
            </>
          ) : null}
          <View style={styles.row}>
            <Text style={styles.label}>Documentation Type:</Text>
            <Text>{formatOption(documentationType)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Additional Amenities:</Text>
            <Text>
              {formatOption(amenities)} {amenities && "(+$300)"}
            </Text>
          </View>
        </View>

        {/* Apartments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apartments</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Needs 3D Models:</Text>
            <Text>
              {formatOption(needsApartmentModels)}{" "}
              {needsApartmentModels && "(+$300)"}
            </Text>
          </View>
          {needsApartmentModels && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Overall Apartments:</Text>
                <Text>
                  {overallApartments} (+${overallApartments * 15})
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Unique Apartments:</Text>
                <Text>
                  {uniqueApartments} (+${uniqueApartments * 300})
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Average Rooms:</Text>
                <Text>
                  {averageRooms} (+${averageRooms * 300})
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Environment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environment</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Has Environment Model:</Text>
            <Text>
              {formatOption(hasEnvironmentModel)}{" "}
              {hasEnvironmentModel === false && "(+$30)"}
            </Text>
          </View>
          {hasEnvironmentModel === false && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Plot Detail:</Text>
                <Text>
                  {formatOption(plotDetail)}
                  {plotDetail === "grass_trees" && " (+$630)"}
                  {plotDetail === "detailed" && " (+$930)"}
                  {plotDetail === "photogrammetry" && " (+$1230)"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Neighborhood Detail:</Text>
                <Text>
                  {formatOption(neighborhoodDetail)}
                  {neighborhoodDetail === "basic" && " (+$300)"}
                  {neighborhoodDetail === "detailed" && " (+$600)"}
                  {neighborhoodDetail === "full" && " (+$900)"}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Website Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Highlight Animation:</Text>
            <Text>
              {formatOption(highlightAnimation)}{" "}
              {highlightAnimation && "(+$60)"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Filtering/Sorting:</Text>
            <Text>
              {formatOption(filteringSorting)} {filteringSorting && "(+$660)"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Languages:</Text>
            <Text>
              {languages} {languages > 0 && `(+$${languages * 450})`}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hero Animation:</Text>
            <Text>
              {formatOption(heroAnimation)}
              {heroAnimation === "time_lapse" && " (+$1200)"}
              {heroAnimation === "close_up" && " (+$600)"}
            </Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.total}>
          <Text style={styles.label}>TOTAL:</Text>
          <Text>{formatPrice(totalPrice)}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for using our Investment Calculator</Text>
          <Text>For any questions, please contact support@example.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
