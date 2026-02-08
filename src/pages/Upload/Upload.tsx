import {
  CurrentDataInfo,
  MainContent,
  Text,
  Title,
  ScreenReaderOnly,
} from "../../components";
import { useData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Upload.styled";

function Upload() {
  const { uploadedData, darkRideData } = useData();
  const navigate = useNavigate();
  const coasterCount = uploadedData?.coasters?.length || 0;
  const darkRideCount = darkRideData?.coasters?.length || 0;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <MainContent>
      <Title>Upload your coaster data</Title>

      <section>
        <Styled.Instructions>
          {(coasterCount > 0 || darkRideCount > 0) && (
            <>
              <CurrentDataInfo
                coasterCount={coasterCount}
                darkRideCount={darkRideCount}
              />
              <Text as="h2" colour="charcoal" fontSize="medium" mb="small">
                Choose your upload method
              </Text>
            </>
          )}
          {coasterCount === 0 && darkRideCount === 0 && (
            <ScreenReaderOnly as="h2">
              Choose your upload method
            </ScreenReaderOnly>
          )}
          <Text as="p" colour="mediumGrey" mb="small">
            Select how you'd like to add coasters to your collection. You can
            use multiple methods - all data will be combined together.
          </Text>
        </Styled.Instructions>

        <Styled.UploadOptions>
          <div>
            <Styled.UploadButton
              onClick={() => handleNavigation("/upload-csv")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigation("/upload-csv");
                }
              }}
            >
              <Styled.UploadIcon>CSV</Styled.UploadIcon>
              <Text as="h3" colour="charcoal" mb="tiny" mt="small">
                Upload CSV file
              </Text>
              <Text as="p" colour="mediumGrey" fontSize="small">
                Import coaster data from a CSV spreadsheet file
              </Text>
            </Styled.UploadButton>
          </div>

          <div>
            <Styled.UploadButton
              onClick={() => handleNavigation("/upload-json")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigation("/upload-json");
                }
              }}
            >
              <Styled.UploadIcon>JSON</Styled.UploadIcon>
              <Text as="h3" colour="charcoal" mb="tiny" mt="small">
                Upload JSON data
              </Text>
              <Text as="p" colour="mediumGrey" fontSize="small">
                Paste JSON data or upload a JSON file
              </Text>
            </Styled.UploadButton>
          </div>

          <div>
            <Styled.UploadButton
              onClick={() => handleNavigation("/upload-manual")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigation("/upload-manual");
                }
              }}
            >
              <Styled.UploadIcon>FORM</Styled.UploadIcon>
              <Text as="h3" colour="charcoal" mb="tiny" mt="small">
                Enter manually
              </Text>
              <Text as="p" colour="mediumGrey" fontSize="small">
                Add coasters one at a time using a form
              </Text>
            </Styled.UploadButton>
          </div>
        </Styled.UploadOptions>
      </section>
    </MainContent>
  );
}

export default Upload;
