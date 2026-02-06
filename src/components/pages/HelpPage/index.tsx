import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import { selectQuickLinks, selectSecurityPrivacyLinks } from 'store/footer/selectors';

const HelpPage: React.FC = () => {
  const location = useLocation();
  const quickLinks = useAppSelector(selectQuickLinks);
  const securityLinks = useAppSelector(selectSecurityPrivacyLinks);

  // Combine both quickLinks and securityLinks
  const allHelpLinks = [...(quickLinks || []), ...(securityLinks || [])];

  // Find the help/faq link matching the current path
  const helpLink = allHelpLinks.find(
    (link) => link.menu_link && link.menu_link.startsWith('help/') && link.is_content && location.pathname === `/${link.menu_link}`
  );

  if (helpLink) {
    return (
      <div className="help-content-page p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{helpLink.link_name}</h2>
        <div
          className="prose prose-invert"
          dangerouslySetInnerHTML={{ __html: helpLink.is_content }}
        />
      </div>
    );
  }

  // Fallback: show not found
  return (
    <div className="help-content-page p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Help Content Not Found</h2>
      <p>The requested help page does not exist.</p>
    </div>
  );
};

export default HelpPage;
