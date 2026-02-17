import { useState } from "react";
import {
  Link,
  CurrentDataInfo,
  InfoMessage,
  MainContent,
  RideTypeToggle,
  Text,
  Title,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import {
  generateCSV,
  generateJSON,
  downloadFile,
  hasRankingDataForExport,
} from "../../utils/dataExport";
import { RideType } from "../../types/data";
import * as Styled from "./Download.styled";

export default function Download() {
  const { uploadedData, darkRideData } = useData();
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [selectedRideType, setSelectedRideType] = useState<RideType>("coaster");

  const coastersData = uploadedData?.coasters || [];
  const darkRidesData = darkRideData?.coasters || [];

  // Get the current data based on the selected ride type
  const currentData =
    selectedRideType === "coaster" ? uploadedData : darkRideData;
  const currentCoasters =
    selectedRideType === "coaster" ? coastersData : darkRidesData;

  const hasRankingData = hasRankingDataForExport(currentData);

  const generateFilename = (format: "csv" | "json"): string => {
    const timestamp = new Date().toISOString().split("T")[0];
    const rideTypeLabel =
      selectedRideType === "coaster" ? "coaster" : "dark-ride";
    return `${rideTypeLabel}-ranker-${timestamp}.${format}`;
  };

  const handleDownload = (format: "csv" | "json") => {
    try {
      let result;
      let contentType: string;

      if (format === "csv") {
        result = generateCSV({
          coasters: currentCoasters,
          includeRanking: hasRankingData,
          rankingMetadata: currentData?.rankingMetadata,
        });
        contentType = "text/csv";
      } else {
        result = generateJSON({
          coasters: currentCoasters,
          includeRanking: hasRankingData,
          rankingMetadata: currentData?.rankingMetadata,
        });
        contentType = "application/json";
      }

      if (result.content && !result.isEmpty) {
        const filename = generateFilename(format);
        const downloadResult = downloadFile({
          content: result.content,
          filename,
          contentType,
        });

        if (downloadResult.success) {
          setDownloadStatus(`${format.toUpperCase()} downloaded successfully!`);
        } else {
          setDownloadStatus(
            downloadResult.error ||
              `Error downloading ${format.toUpperCase()} file`,
          );
        }

        setTimeout(() => setDownloadStatus(null), 3000);
      }
    } catch {
      setDownloadStatus(`Error generating ${format.toUpperCase()} file`);
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  if (coastersData.length === 0 && darkRidesData.length === 0) {
    return (
      <MainContent>
        <Title>Download Your Collection</Title>
        <section>
          <Styled.EmptyState>
            <Text as="h2" center colour="darkGrey" mb="small">
              No Rides Yet
            </Text>
            <Text as="p" center colour="mediumGrey" mb="large">
              Upload some coasters or dark rides to download your collection in
              CSV or JSON format.
            </Text>
            <Link href="/upload" variant="button">
              Upload Rides
            </Link>
          </Styled.EmptyState>
        </section>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Title>Download Your Collection</Title>

      <section>
        <Styled.DownloadContent>
          <CurrentDataInfo
            coasterCount={coastersData.length}
            darkRideCount={darkRidesData.length}
          />

          <Styled.Section>
            <Styled.SectionHeader>
              <Text as="h3" colour="darkGrey" mb="tiny">
                Choose what to download:
              </Text>
            </Styled.SectionHeader>

            <RideTypeToggle
              value={selectedRideType}
              onChange={setSelectedRideType}
              name="download-ride-type"
            />

            {currentCoasters.length === 0 ? (
              <InfoMessage variant="info" role="status" aria-live="polite">
                No {selectedRideType === "coaster" ? "coasters" : "dark rides"}{" "}
                uploaded yet. Switch to{" "}
                {selectedRideType === "coaster" ? "dark rides" : "coasters"} or
                upload some{" "}
                {selectedRideType === "coaster" ? "coasters" : "dark rides"}{" "}
                first.
              </InfoMessage>
            ) : (
              <>
                <Styled.SectionHeader>
                  <Text
                    as="p"
                    colour="mediumGrey"
                    fontSize="small"
                    mt="small"
                    mb="tiny"
                  >
                    Downloading {currentCoasters.length}{" "}
                    {selectedRideType === "coaster" ? "coaster" : "dark ride"}
                    {currentCoasters.length === 1 ? "" : "s"}
                    {hasRankingData && " with ranking"}
                  </Text>
                  <Text as="h3" colour="darkGrey" mb="tiny" mt="medium">
                    Choose your format:
                  </Text>
                </Styled.SectionHeader>

                <Styled.DownloadOptions>
                  <Styled.DownloadButton
                    onClick={() => handleDownload("csv")}
                    aria-describedby="csv-description"
                  >
                    <Styled.ButtonContent>
                      <Text
                        as="h4"
                        bold
                        colour="darkGrey"
                        fontSize="large"
                        mb="fine"
                      >
                        Download as CSV
                      </Text>
                      <Styled.ButtonDescription
                        as="p"
                        colour="mediumGrey"
                        fontSize="small"
                        id="csv-description"
                      >
                        For Excel, Google Sheets, and other spreadsheet apps
                        {hasRankingData && " (includes rank column)"}
                      </Styled.ButtonDescription>
                    </Styled.ButtonContent>
                  </Styled.DownloadButton>

                  <Styled.DownloadButton
                    onClick={() => handleDownload("json")}
                    aria-describedby="json-description"
                  >
                    <Styled.ButtonContent>
                      <Text
                        as="h4"
                        bold
                        colour="darkGrey"
                        fontSize="large"
                        mb="fine"
                      >
                        Download as JSON
                      </Text>
                      <Styled.ButtonDescription
                        as="p"
                        colour="mediumGrey"
                        fontSize="small"
                        id="json-description"
                      >
                        Developer-friendly format for importing into other apps
                        {hasRankingData && " (includes rank field)"}
                      </Styled.ButtonDescription>
                    </Styled.ButtonContent>
                  </Styled.DownloadButton>
                </Styled.DownloadOptions>
              </>
            )}
          </Styled.Section>

          {downloadStatus && (
            <InfoMessage
              variant={
                downloadStatus.includes("successfully") ? "success" : "error"
              }
              role="status"
              aria-live="polite"
            >
              {downloadStatus}
            </InfoMessage>
          )}

          <Styled.InfoSection>
            <Text as="p" colour="mediumGrey" fontSize="small">
              Files are generated locally in your browser - your data stays
              private.
            </Text>
          </Styled.InfoSection>

          <Link href="/view-coasters" variant="back">
            Back to View Coasters
          </Link>
        </Styled.DownloadContent>
      </section>
    </MainContent>
  );
}
