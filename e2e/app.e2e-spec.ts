import { NoteBackPage } from './app.po';

describe('note-back App', function() {
  let page: NoteBackPage;

  beforeEach(() => {
    page = new NoteBackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
