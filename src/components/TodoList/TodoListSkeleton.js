import { Layout, LegacyCard, SkeletonBodyText, SkeletonPage } from "@shopify/polaris"

export const TodoListSkeleton = () => {
    return (
        <SkeletonPage title="Todoes" primaryAction>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <SkeletonBodyText />
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    )
}