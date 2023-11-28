import Entry from "./Entry";
import PublicUser from "./PublicUser";

type PageDTO = {
  publicUser: PublicUser,
  portfolioEntryList: Array<Entry>
}

export default PageDTO;