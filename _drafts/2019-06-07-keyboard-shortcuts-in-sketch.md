---
layout: post
title: Keyboard Shortcuts in Sketch
date: 2019-06-07 12:00:00 +0200
categories: sketch plugins hack
permalink: /keyboard-shortcuts-in-sketch
---

```
defaults write com.bohemiancoding.sketch3 NSUserKeyEquivalents -dict-add "Menu Item" -string "@$~^k"
```
You can use multiple commands to add multiple shortcuts, or add all of them at once by using this syntax:

```
defaults write com.bohemiancoding.sketch3 NSUserKeyEquivalents '{
    "Menu Item 1" = "@$c";
    "Menu Item 2" = "@$c";
    "Menu Item 3" = "@$f";
    "Scale..." = "@^s";
    "Round to Pixel" = "@~r";
    "\033Arrange\033Align\033Top" = "@^k";
    "\033Arrange\033Align\033Right" = "@^l";
    "\033Arrange\033Align\033Bottom" = "@^j";
    "\033Arrange\033Align\033Left" = "@^h";
    "\033Arrange\033Align\033Vertically" = "@^-";
    "\033Arrange\033Align\033Horizontally" = "@^\\";
    "\033Arrange\033Distribute\033Vertically" = "$@^-";
    "\033Arrange\033Distribute\033Horizontally" = "$@^\\";
}'
```
Where `@` is Command, `$` is Shift, `^` is Ctrl and `~` is Alt. Slashes need to be escaped (so to make a shortcut with `Cmd Shift \` you'd use `@$\\`).
If the menu item you want to use is nested, you need to use `\033` as a separator, like this:
```
defaults write com.bohemiancoding.sketch3 NSUserKeyEquivalents -dict-add "\033Arrange\033Align\033Top" -string "@^k"
```
So, if you want to set the shortcut for the `Random Photo` option (part of the default Unsplash Data Plugin) you would add it to the list

---
# DefaultKeyBinding.dict
Most of the keybindings for editing text in OS X are defined in `/System/Library/Frameworks/AppKit.framework/Resources/StandardKeyBinding.dict`. You can add custom keybindings by saving a property list like the one below as `~/Library/KeyBindings/DefaultKeyBinding.dict`. Quit and reopen applications to apply changes to `DefaultKeyBinding.dict`.

## My DefaultKeyBinding.dict

```
{
  "~w" = selectWord:;
  "~j" = (selectWord:, cut:);
  "~g" = (selectWord:, copy:);
  "~h" = (selectWord:, paste:);

  "~l" = selectParagraph:;
  "~z" = (selectParagraph:, deleteBackward:);
  "~x" = (selectParagraph:, cut:);
  "~c" = (selectParagraph:, copy:);

  "~s" = (moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:);
  "~y" = (moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:, deleteBackward:);
  "~q" = (moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:, cut:);
  "~m" = (moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:, copy:);

  "~a" = (moveToBeginningOfParagraphAndModifySelection:, copy:);
  "~r" = (moveToEndOfParagraphAndModifySelection:, copy:);
  "~t" = (moveToBeginningOfParagraphAndModifySelection:, cut:);
  "~k" = (moveToEndOfParagraphAndModifySelection:, cut:);

  "~v" = (delete:, setMark:, paste:, selectToMark:);

  "~d" = (setMark:, moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:, delete:, yank:, insertNewlineIgnoringFieldEditor:, yank:, swapWithMark:);

  "~-" = lowercaseWord:;
  "~=" = uppercaseWord:;
  "~." = capitalizeWord:;

  "@\r" = (moveToEndOfParagraph:, insertNewlineIgnoringFieldEditor:, deleteToBeginningOfParagraph:);
  "$\r" = (moveToBeginningOfParagraph:, insertNewlineIgnoringFieldEditor:, moveBackward:);

  "~\Uf700" = (moveUp:, moveUp:, moveUp:, moveUp:, moveUp:, moveUp:, moveUp, moveUp);
  "~\Uf701" = (moveDown:, moveDown:, moveDown:, moveDown:, moveDown:, moveDown:, moveDown, moveDown);
  "~$\Uf700" = (moveUpAndModifySelection:, moveUpAndModifySelection:, moveUpAndModifySelection:, moveUpAndModifySelection:, moveUpAndModifySelection:, moveUpAndModifySelection:, moveUpAndModifySelection, moveUpAndModifySelection);
  "~$\Uf701" = (moveDownAndModifySelection:, moveDownAndModifySelection:, moveDownAndModifySelection:, moveDownAndModifySelection:, moveDownAndModifySelection:, moveDownAndModifySelection:, moveDownAndModifySelection, moveDownAndModifySelection);

  "^~\Uf700" = (selectParagraph:, setMark:, deleteToMark:, moveBackward:, moveToBeginningOfParagraph:, setMark:, yank:, moveBackward:, selectToMark:);
  "^~\Uf701" = (selectParagraph:, setMark:, deleteToMark:, moveToEndOfParagraph:, moveForward:, setMark:, yank:, moveBackward:, selectToMark:);

  "@\Uf728" = deleteToEndOfParagraph:;

  "^," = moveToBeginningOfDocument:;
  "^." = moveToEndOfDocument:;
  "^$," = moveToBeginningOfDocumentAndModifySelection:;
  "^$." = moveToEndOfDocumentAndModifySelection:;
  "^~," = (moveToBeginningOfDocumentAndModifySelection:, deleteBackward);
  "^~." = (moveToEndOfDocumentAndModifySelection:, deleteBackward);
}
```

## Notes

`DefaultKeyBinding.dict` is ignored by some applications like XCode and Firefox and in some views like in WebKit web inspectors.

Key combinations that enter dead key states cannot be reassigned. They include option-E, option-I, option-N, option-U, and option-` in the U.S. keyboard layout.

`setMark:, selectToMark:` makes the methods that modify a selection always expand the selection.

`delete:` (which is bound to the clear key) does not delete anything when there is no selection. `deleteBackward:` (which is bound to the delete key) does not add a selection it deletes to the kill ring. `deleteBackward:` does not add a selection whose length is one character to the kill ring but `setMark:`, `deleteToMark:` does.

`scrollPageDown:` (which is bound to page down key) does not move the caret but `pageDown:` (which bound to option-page down) does. I have not changed the page down key to `pageDown:` because the `pageDown:` method does not do anything in Safari or in other web views.

To expand a selection so that it starts at the beginning of a hard line and ends at the end of a hard line, you can use `moveToBeginningOfParagraphAndModifySelection:, moveToEndOfParagraphAndModifySelection:` or `selectParagraph:, moveForwardAndModifySelection:, moveBackwardAndModifySelection:, moveBackwardAndModifySelection:, moveToEndOfParagraphAndModifySelection:`. When the initial selection ends with a newline, the first option keeps the newline in the selection but the second option does not.

`delete:, setMark:, paste:, selectToMark:` pastes text and selects the text that is pasted. Without the `delete:` method the original selection would be kept when the original selection is longer than the text that is pasted.

`defaults write -g NSTextKillRingSize -int 100` makes `yankPop:` cycle through previously killed pieces of text.

## Shortcut strings

```
\t tab
\n enter
\r return
\U001b escape
\U007f delete
\Uf700 up
\Uf701 down
\Uf702 left
\Uf703 right
\Uf704 F1
\Uf705 F2
\Uf706 F3
\Uf707 F4
\Uf708 F5
\Uf709 F6
\Uf70a F7
\Uf70b F8
\Uf70c F9
\Uf70d F10
\Uf70e F11
\Uf70f F12
\Uf710 F13
\Uf711 F14
\Uf712 F15
\Uf713 F16
\Uf714 F17
\Uf715 F18
\Uf716 F19
\Uf717 F20
\Uf728 forward delete
\Uf729 home
\Uf72b end
\Uf72c page up
\Uf72d page down
\Uf739 clear
```

`^` is control, `~` is option, `$` is shift, and `@` is command. `#` is a modifier for keys on the numpad, so that `#1` means the numpad 1 key.
The code points starting from `F700` are listed in <http://www.unicode.org/Public/MAPPINGS/VENDORS/APPLE/CORPCHAR.TXT>
In other contexts like in `NSUserKeyEquivalents` dictionaries, delete is `\U0008` (`\b`) and forward delete is `\U007f`.
The escape sequences that start with a backslash (like `\Uf700`) are only supported in the old-style property list syntax. Use escape sequences like &#xf700; in an XML property list.

## Methods
http://www.hcs.harvard.edu/~jrus/site/selectors.html
http://svn.gna.org/svn/gnustep/apps/gorm/tags/Gorm-0_1_0/ClassInformation.plist
NSResponder
NSApplication
NSDocument
NSTextView
NSWindow

The `NSResponder` class includes these methods:

```
capitalizeWord:
centerSelectionInVisibleArea:
deleteBackward:
deleteBackwardByDecomposingPreviousCharacter:
deleteForward:
deleteToBeginningOfLine:
deleteToBeginningOfParagraph:
deleteToEndOfLine:
deleteToEndOfParagraph:
deleteToMark:
deleteWordBackward:
deleteWordForward:
insertBacktab:
insertDoubleQuoteIgnoringSubstitution:
insertNewline:
insertNewlineIgnoringFieldEditor:
insertSingleQuoteIgnoringSubstitution:
insertTab:
insertTabIgnoringFieldEditor:
insertText:
lowercaseWord:
moveBackward:
moveBackwardAndModifySelection:
moveDown:
moveDownAndModifySelection:
moveForward:
moveForwardAndModifySelection:
moveLeft:
moveLeftAndModifySelection:
moveParagraphBackwardAndModifySelection:
moveParagraphForwardAndModifySelection:
moveRight:
moveRightAndModifySelection:
moveToBeginningOfDocument:
moveToBeginningOfDocumentAndModifySelection:
moveToBeginningOfLine:
moveToBeginningOfLineAndModifySelection:
moveToBeginningOfParagraph:
moveToBeginningOfParagraphAndModifySelection:
moveToEndOfDocument:
moveToEndOfDocumentAndModifySelection:
moveToEndOfLine:
moveToEndOfLineAndModifySelection:
moveToEndOfParagraph:
moveToEndOfParagraphAndModifySelection:
moveToLeftEndOfLine:
moveToLeftEndOfLineAndModifySelection:
moveToRightEndOfLine:
moveToRightEndOfLineAndModifySelection:
moveUp:
moveUpAndModifySelection:
moveWordBackward:
moveWordBackwardAndModifySelection:
moveWordForward:
moveWordForwardAndModifySelection:
moveWordLeft:
moveWordLeftAndModifySelection:
moveWordRight:
moveWordRightAndModifySelection:
pageDown:
pageDownAndModifySelection:
pageUp:
pageUpAndModifySelection:
scrollLineDown:
scrollLineUp:
scrollPageDown:
scrollPageUp:
scrollToBeginningOfDocument:
scrollToEndOfDocument:
selectAll:
selectLine:
selectParagraph:
selectToMark:
selectWord:
setMark:
swapWithMark:
transpose:
uppercaseWord:
yank:
```

These methods are included in classes other than `NSResponder`:

```
copy:
cut:
delete:
paste:
pasteAsPlainText:
redo:
undo:
yankAndSelect:
```

## Emacs keybindings

```
{
  "^ " = setMark:;
  "^/" = undo:;
  "^w" = deleteToMark:;
  "^x" = {
    "^x" = swapWithMark:;
    "^m" = selectToMark:;
  };
  "^V" = pageDownAndModifySelection:;
  "~@" = selectWord:;
  "~b" = moveWordBackward:;
  "~c" = (capitalizeWord:, moveForward:, moveForward:);
  "~d" = deleteWordForward:;
  "~f" = moveWordForward:;
  "~l" = (lowercaseWord:, moveForward:, moveForward:);
  "~u" = (uppercaseWord:, moveForward:, moveForward:);
  "~v" = pageUp:;
  "~y" = yankPop:;
  "~w" = (deleteToMark:, setMark:, yank:, swapWithMark:);
  "~B" = moveWordBackwardAndModifySelection:;
  "~F" = moveWordForwardAndModifySelection:;
  "~V" = pageUpAndModifySelection:;
}
```
<http://www.hcs.harvard.edu/~jrus/site/KeyBindings/Emacs%20Opt%20Bindings.dict> includes a few more keybindings, but for example `transposeWords:` does not work in most applications, `openDocument:` and `saveDocument:` do not work in applications that use auto-save, and `performClose:` does not work everywhere either.

## StandardKeyBinding.dict

```
$ plutil -convert xml1 /System/Library/Frameworks/AppKit.framework/Resources/StandardKeyBinding.dict -o -|pl|grep -v noop:|ruby -pe'$_.gsub!(/[^ -~\n]/){"\\U%04x"%$&.ord}'
{
    "\U0003" = "insertNewline:";
    "\b" = "deleteBackward:";
    "\t" = "insertTab:";
    "\n" = "insertNewline:";
    "\U000d" = "insertNewline:";
    "\U0019" = "insertBacktab:";
    "\U001b" = "cancelOperation:";
    "$\Uf700" = "moveUpAndModifySelection:";
    "$\Uf701" = "moveDownAndModifySelection:";
    "$\Uf702" = "moveLeftAndModifySelection:";
    "$\Uf703" = "moveRightAndModifySelection:";
    "$\Uf729" = "moveToBeginningOfDocumentAndModifySelection:";
    "$\Uf72b" = "moveToEndOfDocumentAndModifySelection:";
    "$\Uf72c" = "pageUpAndModifySelection:";
    "$\Uf72d" = "pageDownAndModifySelection:";
    "@ " = "cycleToNextInputScript:";
    "@$\Uf700" = "moveToBeginningOfDocumentAndModifySelection:";
    "@$\Uf701" = "moveToEndOfDocumentAndModifySelection:";
    "@$\Uf702" = "moveToLeftEndOfLineAndModifySelection:";
    "@$\Uf703" = "moveToRightEndOfLineAndModifySelection:";
    "@." = "cancelOperation:";
    "@^ " = "togglePlatformInputSystem:";
    "@^\Uf701" = "makeBaseWritingDirectionNatural:";
    "@^\Uf702" = "makeBaseWritingDirectionRightToLeft:";
    "@^\Uf703" = "makeBaseWritingDirectionLeftToRight:";
    "@~ " = "cycleToNextInputKeyboardLayout:";
    "@~^\Uf701" = "makeTextWritingDirectionNatural:";
    "@~^\Uf702" = "makeTextWritingDirectionRightToLeft:";
    "@~^\Uf703" = "makeTextWritingDirectionLeftToRight:";
    "@\U007f" = "deleteToBeginningOfLine:";
    "@\Uf700" = "moveToBeginningOfDocument:";
    "@\Uf701" = "moveToEndOfDocument:";
    "@\Uf702" = "moveToLeftEndOfLine:";
    "@\Uf703" = "moveToRightEndOfLine:";
    "^\U0003" = "insertLineBreak:";
    "^\t" = "selectNextKeyView:";
    "^\n" = "insertLineBreak:";
    "^\U000d" = "insertLineBreak:";
    "^\U0019" = "selectPreviousKeyView:";
    "^\"" = "insertDoubleQuoteIgnoringSubstitution:";
    "^$\Uf702" = "moveToLeftEndOfLineAndModifySelection:";
    "^$\Uf703" = "moveToRightEndOfLineAndModifySelection:";
    "^'" = "insertSingleQuoteIgnoringSubstitution:";
    "^/" = "insertRightToLeftSlash:";
    "^A" = "moveToBeginningOfParagraphAndModifySelection:";
    "^B" = "moveBackwardAndModifySelection:";
    "^E" = "moveToEndOfParagraphAndModifySelection:";
    "^F" = "moveForwardAndModifySelection:";
    "^N" = "moveDownAndModifySelection:";
    "^P" = "moveUpAndModifySelection:";
    "^V" = "pageDownAndModifySelection:";
    "^a" = "moveToBeginningOfParagraph:";
    "^b" = "moveBackward:";
    "^d" = "deleteForward:";
    "^e" = "moveToEndOfParagraph:";
    "^f" = "moveForward:";
    "^h" = "deleteBackward:";
    "^k" = "deleteToEndOfParagraph:";
    "^l" = "centerSelectionInVisibleArea:";
    "^n" = "moveDown:";
    "^o" =     (
        "insertNewlineIgnoringFieldEditor:",
        "moveBackward:"
    );
    "^p" = "moveUp:";
    "^t" = "transpose:";
    "^v" = "pageDown:";
    "^y" = "yank:";
    "^~\U007f" = "deleteWordBackward:";
    "^\U007f" = "deleteBackwardByDecomposingPreviousCharacter:";
    "^\Uf700" = "scrollPageUp:";
    "^\Uf701" = "scrollPageDown:";
    "^\Uf702" = "moveToLeftEndOfLine:";
    "^\Uf703" = "moveToRightEndOfLine:";
    "~\U0003" = "insertNewlineIgnoringFieldEditor:";
    "~\b" = "deleteWordBackward:";
    "~\t" = "insertTabIgnoringFieldEditor:";
    "~\n" = "insertNewlineIgnoringFieldEditor:";
    "~\U000d" = "insertNewlineIgnoringFieldEditor:";
    "~\U001b" = "complete:";
    "~$\Uf700" = "moveParagraphBackwardAndModifySelection:";
    "~$\Uf701" = "moveParagraphForwardAndModifySelection:";
    "~$\Uf702" = "moveWordLeftAndModifySelection:";
    "~$\Uf703" = "moveWordRightAndModifySelection:";
    "~^B" = "moveWordBackwardAndModifySelection:";
    "~^F" = "moveWordForwardAndModifySelection:";
    "~^b" = "moveWordBackward:";
    "~^f" = "moveWordForward:";
    "~\U007f" = "deleteWordBackward:";
    "~\Uf700" =     (
        "moveBackward:",
        "moveToBeginningOfParagraph:"
    );
    "~\Uf701" =     (
        "moveForward:",
        "moveToEndOfParagraph:"
    );
    "~\Uf702" = "moveWordLeft:";
    "~\Uf703" = "moveWordRight:";
    "~\Uf728" = "deleteWordForward:";
    "~\Uf72c" = "pageUp:";
    "~\Uf72d" = "pageDown:";
    "\U007f" = "deleteBackward:";
    "\Uf700" = "moveUp:";
    "\Uf701" = "moveDown:";
    "\Uf702" = "moveLeft:";
    "\Uf703" = "moveRight:";
    "\Uf708" = "complete:";
    "\Uf728" = "deleteForward:";
    "\Uf729" = "scrollToBeginningOfDocument:";
    "\Uf72b" = "scrollToEndOfDocument:";
    "\Uf72c" = "scrollPageUp:";
    "\Uf72d" = "scrollPageDown:";
    "\Uf739" = "delete:";
}
```

## See also

- http://www.hcs.harvard.edu/~jrus/site/cocoa-text.html
- http://www.hcs.harvard.edu/~jrus/site/
- https://developer.apple.com/library/mac/documentation/cocoa/conceptual/eventoverview/TextDefaultsBindings/TextDefaultsBindings.html
- https://github.com/ttscoff/KeyBindings/blob/master/DefaultKeyBinding.dict

#blogpost #sketch #plugins
