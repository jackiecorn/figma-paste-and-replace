const replace = async () => {
	const selectedNodes = figmaPlus.currentPage.selection;
	for (i = 0; i < selectedNodes.length; i++) {
		await selectedNodes[i].getProperties();
		App.triggerAction('paste-over-selection');
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	if (selectedNodes.length > 1) figmaPlus.showToast({ message: 'All layers have been replaced!' });
};

const replaceAndKeepSize = async () => {
	const selectedNodes = figmaPlus.currentPage.selection;
	for (i = 0; i < selectedNodes.length; i++) {
		const selectedNode = await selectedNodes[i].getProperties();
		App.triggerAction('paste-over-selection');
		App.updateSelectionProperties({ width: selectedNode.width, height: selectedNode.height });
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	if (selectedNodes.length > 1) figmaPlus.showToast({ message: 'All layers have been replaced!' });
};

figmaPlus.addCommand({
	label: 'Paste and Replace',
	submenu: [{ label: 'Replace', action: replace }, { label: 'Replace and Keep Size', action: replaceAndKeepSize }],
	showInSelectionMenu: true
});
