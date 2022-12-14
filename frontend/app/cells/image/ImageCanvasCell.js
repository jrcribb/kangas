import { Suspense } from "react";
import config from "../../../config";
import fetchAsset from "../../../lib/fetchAsset";
import ImageCanvasClient from "./ImageCanvasClient";
import CanvasContext from "../../../lib/contexts/CanvasContext";

const ImageCanvasCell = async ({ value, query }) => {
    const { type, assetType, assetId } = value;
    const { dgid } = query;
    const image = await fetchAsset({ query: { assetId, dgid }, returnUrl: true });

    // TODO: Abstract this into a fetchAssetMetadata method
    const data = await fetch(`${config.apiUrl}asset-metadata`, {
        method: 'post',
        body: JSON.stringify({
            assetId,
            dgid
        })
    })
    const metadata = await data.json()

    return (
        <Suspense fallback={<>Loading</>}>
            <CanvasContext.Provider
                value={{
                    scoreRange: { min: 0, max: 1 },
                    hiddenLabels: [],
                    metadata: JSON.parse(metadata)
                }}
            >
                <ImageCanvasClient 
                    value={value}
                    query={query}
                    metadata={JSON.parse(metadata)}
                    image={image}
                />
            </CanvasContext.Provider>
        </Suspense>
    )
}

export default ImageCanvasCell;