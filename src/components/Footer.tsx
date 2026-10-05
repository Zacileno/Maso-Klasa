import { Fragment } from "react";
import {
  ORDER_EMAIL,
  ORDER_MAILTO,
  company,
  salesDirector,
  salesReps,
  telHref,
} from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-main__grid">
          <div>
            <p>
              <strong>Sídlo firmy</strong>
            </p>
            <p>
              {company.street}
              <br />
              {company.city}
            </p>
            <p>
              IČO: {company.ico}
              <br />
              DIČ: {company.dic}
              <br />
              Spisová značka: {company.fileNumber}
              <br />
              {company.court}
            </p>
          </div>

          <div>
            <p>
              <strong>Provoz</strong>
            </p>
            <p>
              {company.street}
              <br />
              {company.city}
            </p>
            <p>
              tel.:{" "}
              <a href={telHref(company.operationsPhone)}>
                {company.operationsPhone}
              </a>
              <br />
              <a href={ORDER_MAILTO}>{ORDER_EMAIL}</a>
            </p>
          </div>

          <div>
            <p>
              <strong>Obchodní ředitel</strong>
            </p>
            <p>
              {salesDirector.name}
              <br />
              tel.:{" "}
              <a href={telHref(salesDirector.phone)}>{salesDirector.phone}</a>
              <br />
              (kontakt pro nové zákazníky)
            </p>
          </div>

          <div>
            <p>
              <strong>Obchodní zástupci</strong>
            </p>
            <p>
              {salesReps.map((rep, index) => (
                <Fragment key={rep.name}>
                  {index > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {rep.name}
                  <br />
                  tel.: <a href={telHref(rep.phone)}>{rep.phone}</a>
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Autorská práva © {year}</p>
      </div>
    </footer>
  );
}
