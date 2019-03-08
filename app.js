const replace = async () => {
	const selectedNodes = figmaPlus.scene.selection;
	for (i = 0; i < selectedNodes.length; i++) {
		const selectedNode = await selectedNodes[i].getProperties();
		App.triggerAction('paste-over-selection');
		App.updateSelectionProperties({ width: selectedNode.width, height: selectedNode.height });
		App.triggerAction('select-next-sibling');
		App.triggerAction('delete-selection');
	}
	if (selectedNodes.length > 1) figmaPlus.showToast('All objects have been replaced!');
};

const shortcut = {
	mac: {
		command: true,
		shift: true,
		option: true,
		key: 'V'
	},
	windows: {
		control: true,
		shift: true,
		alt: true,
		key: 'V'
	}
};

figmaPlus.createPluginsMenuItem('Paste and Replace', replace, null, shortcut);

figmaPlus.createContextMenuItem.Selection('Paste and Replace', replace, null, shortcut);

figmaPlus.createKeyboardShortcut(shortcut, replace);
