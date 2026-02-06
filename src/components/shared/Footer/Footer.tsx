import './Footer.css';
import { cn } from 'helpers/ui';
import { useAppSelector, useAppDispatch } from 'store/index';
import { useEffect, useState } from 'react';
import { useDialog } from 'helpers/hooks';
import {
  selectSecurityPrivacyLinks,
  selectQuickLinks,
  // selectFooterLinksLoading,
  // selectFooterLinksError,
  selectFooterDescription,
  // selectFooterContentLoading,
} from 'store/footer/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import type { ApiOtherLinkInfo } from 'api/content/content.types';
import { getSecurityLinks, getQuickLinks } from 'store/footer/slice';
import { getFooterContent } from 'store/footer/footerSlice';
import FooterContentSheet from './FooterContentSheet';

const FooterLink = ({ link }: { link: ApiOtherLinkInfo }) => {
  const { openDialog } = useDialog();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (link.is_content && link.is_content.trim() !== '') {
      openDialog(DIALOG_TYPE.footerContent, {
        title: link.link_name,
        content: link.is_content,
        link: link.menu_link,
        isNewWindow: link.is_newwindow === 'Yes',
      });
    } else if (link.menu_link) {
      if (link.is_newwindow === 'Yes') {
        window.open(link.menu_link, '_blank', 'noopener noreferrer');
      } else {
        window.location.href = link.menu_link;
      }
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="text-left hover:body-txtColor-1 transition-colors cursor-pointer"
      >
        {link.link_name}
      </button>
    </li>
  );
};

const fallbackSecurityLinks = [
  {
    id: 0,
    link_name: 'Privacy policy',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 1,
    link_name: 'Terms and Conditions',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 2,
    link_name: 'Responsible Gaming',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 3,
    link_name: 'Betting Rules',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 4,
    link_name: 'Cookies Policy',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
];

const fallbackQuickLinks = [
  {
    id: 5,
    link_name: 'Customer Login',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 6,
    link_name: 'Customer Sign up',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 7,
    link_name: 'Sportsbook',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 8,
    link_name: 'FAQ',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
  {
    id: 9,
    link_name: 'Help',
    menu_link: '#',
    is_content: '',
    is_newwindow: 'No',
    is_active: true,
  } as ApiOtherLinkInfo,
];

const Footer = () => {
  const dispatch = useAppDispatch();
  const isChatShown = useAppSelector((state) => state.chat.isChatOpen);

  // Redux state for CMS links
  const securityPrivacyLinks = useAppSelector(selectSecurityPrivacyLinks);
  const quickLinks = useAppSelector(selectQuickLinks);

  const footerDescription = useAppSelector(selectFooterDescription);
  // const isContentLoading = useAppSelector(selectFooterContentLoading);

  useEffect(() => {
    dispatch(getSecurityLinks());
    dispatch(getQuickLinks());
    dispatch(getFooterContent());
  }, [dispatch]);

  const displaySecurityLinks =
    securityPrivacyLinks.length > 0
      ? securityPrivacyLinks
      : fallbackSecurityLinks;
  const displayQuickLinks =
    quickLinks.length > 0 ? quickLinks : fallbackQuickLinks;

  const fallbackDescription = `The NFT sports exchange platform is a dynamic marketplace for trading digital sports collectibles,
    leveraging
    blockchain for secure, transparent transactions. It offers fans unique assets like player cards and game
    highlights, fostering deep engagement with favourite teams and esports players.
  
    The platform supports peer-to-peer trading and ensures asset authenticity, creating a vibrant community for
    sports enthusiasts. It's designed to be user-friendly, scalable, and environmentally conscious, positioning
    itself at the forefront of digital sports memorabilia.`;

  const displayDescription = footerDescription || fallbackDescription;

  return (
    <>
      <FooterContentSheet />
      <footer className="ios footer-container flex xl:hidden flex-col gap-6 mt-2 md:mt-14 lg:mt-[52px] px-4 md:px-8 lg:px-5 pb-14 text-base-400 text-xs leading-4s">
        <img
          className="block ml-0 mt-0 w-auto h-auto max-w-[88px]"
          src="/icons/logo.svg"
          alt="Ossino Logo"
        />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[172px] gap-3">
            <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
              Security & Privacy
            </p>

            <ul className="flex flex-col gap-2">
              {displaySecurityLinks.map((link) => (
                <FooterLink key={link.id} link={link} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col w-[172px] gap-3">
            <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
              Quick links
            </p>

            <ul className="flex flex-col gap-2">
              {displayQuickLinks.map((link) => (
                <FooterLink key={link.id} link={link} />
              ))}
            </ul>
          </div>

          <div className="hidden md:flex flex-col gap-3 md:mt-4">
            <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
              Contact Us
            </p>

            <ul className="flex flex-col gap-2">
              <li>
                <a href="tel: +000987654321">000-987654321</a>
              </li>
              <li>
                <a href="mailto: support@nftse.com">support@nftse.com</a>
              </li>
            </ul>

            <div className="flex flex-row gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/facebook.svg" alt="Facebook Icon" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/instagram.svg" alt="Instagram Icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex md:hidden flex-col gap-3">
          <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
            Contact Us
          </p>

          <ul className="flex flex-col gap-2">
            <li>
              <a href="tel: +0009876XXX21">000-9876XXX21</a>
            </li>
            <li>
              <a href="mailto: support@ossino.com">support@ossino.com</a>
            </li>
          </ul>

          <div className="flex flex-row gap-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/facebook.svg" alt="Facebook Icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/instagram.svg" alt="Instagram Icon" />
            </a>
          </div>
        </div>

        <div className="pr-1">
          {footerDescription ? (
            <div
              dangerouslySetInnerHTML={{ __html: displayDescription }}
              className="footer-description"
            />
          ) : (
            <p>{displayDescription}</p>
          )}
        </div>
        <div>
          <p></p>
          <p></p>
        </div>
      </footer>

      <footer
        className={cn(
          'footer-container hidden xl:flex flex-col gap-6 mt-2 md:mt-14 lg:mt-[52px] px-4 lg:px-8 pb-14 text-base-400 text-xs leading-4s transition-all duration-300',
          {
            'xl:w-[calc(100%-340px)] transition-all duration-300': isChatShown,
          },
        )}
      >
        <div className="flex flex-row justify-between gap-28">
          <div className="flex flex-col justify-between gap-5">
            <img
              className="block ml-0 mt-0 w-auto h-auto max-w-[88px]"
              src="/icons/logo.svg"
              alt="Ossino Logo"
            />
            <div className="pr-1">
              {footerDescription ? (
                <div
                  dangerouslySetInnerHTML={{ __html: displayDescription }}
                  className="footer-description"
                />
              ) : (
                <p>{displayDescription}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-[172px] gap-3">
              <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
                Security & Privacy
              </p>
              <ul className="flex flex-col gap-2">
                {displaySecurityLinks.map((link) => (
                  <FooterLink key={link.id} link={link} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col w-[172px] gap-3">
              <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
                Quick links
              </p>
              <ul className="flex flex-col gap-2">
                {displayQuickLinks.map((link) => (
                  <FooterLink key={link.id} link={link} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="white-p text-sm font-medium body-txtColor-1 leading-[18px]">
                Contact Us
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="tel:+000987654321">000-987654321</a>
                </li>
                <li>
                  <a href="mailto:support@nftse.com">support@nftse.com</a>
                </li>
              </ul>
              <div className="flex flex-row gap-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/icons/facebook.svg" alt="Facebook Icon" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/icons/instagram.svg" alt="Instagram Icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
