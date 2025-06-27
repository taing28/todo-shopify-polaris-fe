import { TopBar, Icon, Text } from "@shopify/polaris"
import { NotificationIcon, SidekickIcon } from "@shopify/polaris-icons"
import { useState } from "react";

export const Header = () => {
    const [searchField, setSearchField] = useState('');
    
    const secondaryMenuMarkup = (
        <div style={{ display: "flex", alignItems: "center" }}>
            {/* Sidekick Icon */}
            <TopBar.Menu
                activatorContent={
                    <span>
                        <Icon source={SidekickIcon} />
                        <Text as="span" visuallyHidden>
                            Sidekick
                        </Text>
                    </span>
                }
                onOpen={() => console.log("Sidekick opened")}
            />

            {/* Notification Menu */}
            <TopBar.Menu
                activatorContent={
                    <span>
                        <Icon source={NotificationIcon} />
                        <Text as="span" visuallyHidden>
                            Notifications
                        </Text>
                    </span>
                }
                onOpen={() => console.log("Notifications opened")}
            />
            
        </div>
    );


    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Stellar Interiors"
            initials="D"
            avatar="https://preview.redd.it/p5x2gsunb9l61.png?width=1080&crop=smart&auto=webp&s=3f556af02d967ff5e66e6aec656697f6900cef7b"
        />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            value={searchField}
            onChange={(value) => setSearchField(value)}
            userMenuActions={null}
            placeholder="Search"
            showFocusBorder
        />
    );

    return (
        <TopBar
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}
            showNavigationToggle
            searchField={searchFieldMarkup}
        />
    )
}