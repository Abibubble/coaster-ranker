import React, { useState } from "react";
import {
  CodeBlock,
  CurrentDataInfo,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  PreRankingQuestion,
  RideTypeToggle,
  ScreenReaderOnly,
  Title,
  Text,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import { RideType } from "../../types/data";
import {
  useUploadState,
  handlePreRankingAnswer as handlePreRankingAnswerUtil,
  handlePreRankingCancel as handlePreRankingCancelUtil,
  handleUploadDuplicateResolution,
  processUploadWorkflow,
} from "../../utils/uploadState";
import type { DuplicateResolution } from "../../components/DuplicateResolver";
import * as Styled from "./UploadCSV.styled";

export default function UploadCSV() {
  const {
    uploadedData,
    setUploadedData,
    darkRideData,
    setDarkRideData,
    isLoading,
    setIsLoading,
  } = useData();
  const uploadState = useUploadState();
  const [rideType, setRideType] = useState<RideType>("coaster");

  // Get current data based on ride type
  const currentData = rideType === "coaster" ? uploadedData : darkRideData;
  const setCurrentData =
    rideType === "coaster" ? setUploadedData : setDarkRideData;
  const coasterCount = uploadedData?.coasters?.length || 0;
  const darkRideCount = darkRideData?.coasters?.length || 0;
  const existingCoasterCount = currentData?.coasters?.length || 0;

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    handleUploadDuplicateResolution({
      resolutions,
      duplicates: uploadState.duplicates,
      pendingCoasters: uploadState.pendingCoasters,
      pendingFilename: uploadState.pendingFilename,
      uploadedData: currentData,
      uploadStateActions: uploadState,
      setUploadedData: setCurrentData,
      successMessagePrefix: `Successfully processed CSV file! Added to ${rideType === "coaster" ? "coaster" : "dark ride"} collection.`,
    });
  };

  const handleDuplicateCancel = () => {
    uploadState.clearPendingData();
    uploadState.setError("Upload cancelled.");
  };

  const handlePreRankingAnswer = (isPreRanked: boolean) => {
    handlePreRankingAnswerUtil({
      isPreRanked,
      pendingCoasters: uploadState.pendingCoasters,
      pendingFilename: uploadState.pendingFilename,
      uploadedData: currentData,
      uploadStateActions: uploadState,
      setUploadedData: setCurrentData,
      successMessagePrefix: `Successfully processed CSV file! Added to ${rideType === "coaster" ? "coaster" : "dark ride"} collection.`,
    });
  };

  const handlePreRankingCancel = () => {
    handlePreRankingCancelUtil({ uploadStateActions: uploadState });
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    uploadState.setError("");
    uploadState.setSuccess("");
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvContent = e.target?.result as string;
        await processUploadWorkflow({
          fileContent: csvContent,
          filename: file.name,
          uploadedData: currentData,
          uploadStateActions: uploadState,
          setUploadedData: setCurrentData,
          setIsLoading,
          successMessagePrefix: `Successfully processed CSV file! Added to ${rideType === "coaster" ? "coaster" : "dark ride"} collection.`,
          rideType,
        });
      } catch (err) {
        uploadState.setError(
          err instanceof Error ? err.message : "Failed to process file",
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      uploadState.setError("Failed to read file");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <MainContent>
      <Title>Upload CSV File</Title>

      <section>
        <Styled.Instructions>
          {(coasterCount > 0 || darkRideCount > 0) && (
            <>
              <CurrentDataInfo
                coasterCount={coasterCount}
                darkRideCount={darkRideCount}
                rideType={rideType}
              />
              <Text as="h2" colour="charcoal" fontSize="medium" mb="small">
                Import from CSV Spreadsheet -{" "}
                {rideType === "coaster" ? "Coasters" : "Dark Rides"}
              </Text>
            </>
          )}
          {existingCoasterCount === 0 && (
            <ScreenReaderOnly as="h2">
              Import from CSV Spreadsheet -{" "}
              {rideType === "coaster" ? "Coasters" : "Dark Rides"}
            </ScreenReaderOnly>
          )}
          <Text as="p" colour="mediumGrey" mb="small">
            Upload a CSV file containing your{" "}
            {rideType === "coaster" ? "coaster" : "dark ride"} data. Each row
            should represent one{" "}
            {rideType === "coaster" ? "coaster" : "dark ride"} with the required
            fields.
          </Text>
        </Styled.Instructions>

        {/* Ride Type Toggle */}
        <div style={{ marginBottom: "1rem" }}>
          <RideTypeToggle
            value={rideType}
            onChange={(newRideType) => setRideType(newRideType)}
          />
        </div>

        {/* Required Fields Info */}
        <Styled.RequiredFields>
          <Text as="h3" colour="darkBlue" mb="small">
            Required Fields:
          </Text>
          <ul>
            <Text as="li" colour="slateGrey">
              <Text bold>name:</Text> Coaster name
            </Text>
            <Text as="li" colour="slateGrey">
              <Text bold>park:</Text> Theme park
            </Text>
            <Text as="li" colour="slateGrey">
              <Text bold>manufacturer:</Text> Builder company
            </Text>
          </ul>

          <Text as="h3" colour="darkBlue" mb="small" mt="medium">
            Optional Fields:
          </Text>
          <ul>
            <Text as="li" colour="slateGrey">
              <Text bold>model:</Text> Model name
            </Text>
            {rideType === "coaster" && (
              <>
                <Text as="li" colour="slateGrey">
                  <Text bold>material:</Text> Steel/Wood/Hybrid
                </Text>
                <Text as="li" colour="slateGrey">
                  <Text bold>thrillLevel:</Text> Kiddie/Family/Family
                  Thrill/Thrill
                </Text>
              </>
            )}
            <Text as="li" colour="slateGrey">
              <Text bold>country:</Text> Country location
            </Text>
          </ul>
        </Styled.RequiredFields>

        {/* CSV Format Example */}
        <Styled.ExampleFiles>
          <details>
            <Text as="summary" bold colour="orange">
              CSV Format Example
            </Text>

            <CodeBlock>
              {rideType === "coaster"
                ? `name,park,manufacturer,model,material,thrillLevel,country
The Smiler,Alton Towers,Gerstlauer,Euro-Fighter,Steel,Thrill,United Kingdom
Nemesis,Alton Towers,Bolliger & Mabillard,Inverted Coaster,Steel,Thrill,United Kingdom
Stealth,Thorpe Park,Intamin,Accelerator Coaster,Steel,Family Thrill,United Kingdom`
                : `name,park,manufacturer,model,country
Haunted Mansion,Magic Kingdom,Disney Imagineering,Omnimover,United States
Spider-Man,Universal Studios,Universal Creative,Trackless Dark Ride,United States
Ratatouille,EPCOT,Disney Imagineering,Trackless Dark Ride,United States`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* File Upload */}
        <Styled.FileSection>
          <Text as="h3" colour="charcoal" mb="small">
            Select CSV File
          </Text>
          <Styled.FileInputWrapper>
            <Styled.FileInput
              type="file"
              id="csv-file-upload"
              accept=".csv,text/csv"
              onChange={handleFileInput}
              aria-describedby="file-status"
            />
            <Styled.FileLabel
              htmlFor="csv-file-upload"
              $isLoading={isLoading}
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isLoading) {
                  e.preventDefault();
                }
              }}
            >
              {isLoading ? "Processing File..." : "Choose CSV File"}
            </Styled.FileLabel>
          </Styled.FileInputWrapper>
          <Text
            as="p"
            center
            colour="mutedGrey"
            fontSize="small"
            id="file-status"
            mt="tiny"
          >
            {isLoading
              ? "Please wait while your file is being processed..."
              : "Only CSV files are accepted. The file should have headers in the first row."}
          </Text>
        </Styled.FileSection>

        {/* Duplicate Resolution */}
        {uploadState.showDuplicateResolver &&
          uploadState.duplicates.length > 0 && (
            <DuplicateResolver
              duplicates={uploadState.duplicates}
              onResolve={handleDuplicateResolution}
              onCancel={handleDuplicateCancel}
            />
          )}

        {/* Status Messages */}
        {uploadState.error && (
          <InfoMessage variant="error" role="alert" aria-live="assertive">
            <Text as="span" bold colour="errorText" fontSize="small">
              ERROR:
            </Text>
            <Text as="span" colour="errorText" fontSize="small">
              {uploadState.error}
            </Text>
          </InfoMessage>
        )}

        {uploadState.success && (
          <InfoMessage variant="success" role="status" aria-live="polite">
            <Text as="span" bold colour="successGreen" fontSize="small">
              SUCCESS:
            </Text>
            <Text as="span" colour="successGreen" fontSize="small">
              {uploadState.success}
            </Text>
          </InfoMessage>
        )}
      </section>

      {/* Pre-ranking Question Modal */}
      {uploadState.showPreRankingQuestion && (
        <PreRankingQuestion
          coasterCount={uploadState.pendingCoasters.length}
          existingCoasterCount={existingCoasterCount}
          filename={uploadState.pendingFilename}
          hasExistingRankedData={
            uploadedData?.rankingMetadata?.isRanked || false
          }
          onAnswer={handlePreRankingAnswer}
          onCancel={handlePreRankingCancel}
        />
      )}
    </MainContent>
  );
}
