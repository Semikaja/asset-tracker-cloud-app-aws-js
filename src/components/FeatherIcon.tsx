import styles from 'components/FeatherIcon.module.css'
import { icons as featherIcons } from 'feather-icons'
import type { FunctionComponent, PropsWithChildren } from 'react'

type IconOptions = {
	/** defaults to 1.5 */
	strokeWidth?: number
	/** defaults to 'inherit' */
	color?: string
	/** defaults to 20 */
	size?: number
	title: string
	className?: string
}

// Must be wrapped in an element: https://github.com/reactjs/rfcs/pull/129
const wrapSvg = (options: IconOptions) => (f: (typeof featherIcons)[0]) =>
	(
		<span
			className={`${options.className ?? ''} ${
				styles.iconContainer
			} feather-icon`}
			style={{
				height: `${options.size ?? 20}px`,
				width: `${options.size ?? 20}px`,
				color: `${options.color ?? 'inherit'}`,
			}}
			aria-label={options.title}
			dangerouslySetInnerHTML={{
				__html: f.toSvg({
					'stroke-width': `${options.strokeWidth ?? '1.5'}px`,
					width: `${options.size ?? 20}px`,
					height: `${options.size ?? 20}px`,
				}),
			}}
		/>
	)
type FeatherIconIdentifier =
	| 'activity'
	| 'airplay'
	| 'alert-circle'
	| 'alert-octagon'
	| 'alert-triangle'
	| 'align-center'
	| 'align-justify'
	| 'align-left'
	| 'align-right'
	| 'anchor'
	| 'aperture'
	| 'archive'
	| 'arrow-down-circle'
	| 'arrow-down-left'
	| 'arrow-down-right'
	| 'arrow-down'
	| 'arrow-left-circle'
	| 'arrow-left'
	| 'arrow-right-circle'
	| 'arrow-right'
	| 'arrow-up-circle'
	| 'arrow-up-left'
	| 'arrow-up-right'
	| 'arrow-up'
	| 'at-sign'
	| 'award'
	| 'bar-chart-2'
	| 'bar-chart'
	| 'battery-charging'
	| 'battery'
	| 'bell-off'
	| 'bell'
	| 'bluetooth'
	| 'bold'
	| 'bookmark'
	| 'book-open'
	| 'book'
	| 'box'
	| 'briefcase'
	| 'calendar'
	| 'camera-off'
	| 'camera'
	| 'cast'
	| 'check-circle'
	| 'check-square'
	| 'check'
	| 'chevron-down'
	| 'chevron-left'
	| 'chevron-right'
	| 'chevrons-down'
	| 'chevrons-left'
	| 'chevrons-right'
	| 'chevrons-up'
	| 'chevron-up'
	| 'chrome'
	| 'circle'
	| 'clipboard'
	| 'clock'
	| 'cloud-drizzle'
	| 'cloud-lightning'
	| 'cloud-off'
	| 'cloud-rain'
	| 'cloud-snow'
	| 'cloud'
	| 'codepen'
	| 'codesandbox'
	| 'code'
	| 'coffee'
	| 'columns'
	| 'command'
	| 'compass'
	| 'copy'
	| 'corner-down-left'
	| 'corner-down-right'
	| 'corner-left-down'
	| 'corner-left-up'
	| 'corner-right-down'
	| 'corner-right-up'
	| 'corner-up-left'
	| 'corner-up-right'
	| 'cpu'
	| 'credit-card'
	| 'crop'
	| 'crosshair'
	| 'database'
	| 'delete'
	| 'disc'
	| 'divide-circle'
	| 'divide-square'
	| 'divide'
	| 'dollar-sign'
	| 'download-cloud'
	| 'download'
	| 'dribbble'
	| 'droplet'
	| 'edit-2'
	| 'edit-3'
	| 'edit'
	| 'external-link'
	| 'eye-off'
	| 'eye'
	| 'facebook'
	| 'fast-forward'
	| 'feather'
	| 'figma'
	| 'file-minus'
	| 'file-plus'
	| 'file'
	| 'file-text'
	| 'film'
	| 'filter'
	| 'flag'
	| 'folder-minus'
	| 'folder-plus'
	| 'folder'
	| 'framer'
	| 'frown'
	| 'gift'
	| 'git-branch'
	| 'git-commit'
	| 'github'
	| 'gitlab'
	| 'git-merge'
	| 'git-pull-request'
	| 'globe'
	| 'grid'
	| 'hard-drive'
	| 'hash'
	| 'headphones'
	| 'heart'
	| 'help-circle'
	| 'hexagon'
	| 'home'
	| 'image'
	| 'inbox'
	| 'info'
	| 'instagram'
	| 'italic'
	| 'key'
	| 'layers'
	| 'layout'
	| 'life-buoy'
	| 'link-2'
	| 'linkedin'
	| 'link'
	| 'list'
	| 'loader'
	| 'lock'
	| 'log-in'
	| 'log-out'
	| 'mail'
	| 'map-pin'
	| 'map'
	| 'maximize-2'
	| 'maximize'
	| 'meh'
	| 'menu'
	| 'message-circle'
	| 'message-square'
	| 'mic-off'
	| 'mic'
	| 'minimize-2'
	| 'minimize'
	| 'minus-circle'
	| 'minus-square'
	| 'minus'
	| 'monitor'
	| 'moon'
	| 'more-horizontal'
	| 'more-vertical'
	| 'mouse-pointer'
	| 'move'
	| 'music'
	| 'navigation-2'
	| 'navigation'
	| 'octagon'
	| 'package'
	| 'paperclip'
	| 'pause-circle'
	| 'pause'
	| 'pen-tool'
	| 'percent'
	| 'phone-call'
	| 'phone-forwarded'
	| 'phone-incoming'
	| 'phone-missed'
	| 'phone-off'
	| 'phone-outgoing'
	| 'phone'
	| 'pie-chart'
	| 'play-circle'
	| 'play'
	| 'plus-circle'
	| 'plus-square'
	| 'plus'
	| 'pocket'
	| 'power'
	| 'printer'
	| 'radio'
	| 'refresh-ccw'
	| 'refresh-cw'
	| 'repeat'
	| 'rewind'
	| 'rotate-ccw'
	| 'rotate-cw'
	| 'rss'
	| 'save'
	| 'scissors'
	| 'search'
	| 'send'
	| 'server'
	| 'settings'
	| 'share-2'
	| 'share'
	| 'shield-off'
	| 'shield'
	| 'shopping-bag'
	| 'shopping-cart'
	| 'shuffle'
	| 'sidebar'
	| 'skip-back'
	| 'skip-forward'
	| 'slack'
	| 'slash'
	| 'sliders'
	| 'smartphone'
	| 'smile'
	| 'speaker'
	| 'square'
	| 'star'
	| 'stop-circle'
	| 'sunrise'
	| 'sunset'
	| 'sun'
	| 'tablet'
	| 'tag'
	| 'target'
	| 'terminal'
	| 'thermometer'
	| 'thumbs-down'
	| 'thumbs-up'
	| 'toggle-left'
	| 'toggle-right'
	| 'tool'
	| 'trash-2'
	| 'trash'
	| 'trello'
	| 'trending-down'
	| 'trending-up'
	| 'triangle'
	| 'truck'
	| 'tv'
	| 'twitch'
	| 'twitter'
	| 'type'
	| 'umbrella'
	| 'underline'
	| 'unlock'
	| 'upload-cloud'
	| 'upload'
	| 'user-check'
	| 'user-minus'
	| 'user-plus'
	| 'users'
	| 'user'
	| 'user-x'
	| 'video-off'
	| 'video'
	| 'voicemail'
	| 'volume-1'
	| 'volume-2'
	| 'volume'
	| 'volume-x'
	| 'watch'
	| 'wifi-off'
	| 'wifi'
	| 'wind'
	| 'x-circle'
	| 'x-octagon'
	| 'x-square'
	| 'x'
	| 'youtube'
	| 'zap-off'
	| 'zap'
	| 'zoom-in'
	| 'zoom-out'

export const FeatherIcon = ({
	type,
	...options
}: { type: FeatherIconIdentifier } & IconOptions) =>
	wrapSvg(options)(featherIcons[type])

type TypedIconOptions = Omit<IconOptions, 'title'>

export const SpeedIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} type="navigation" title="speed" />
)
export const CloudUploadIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="☁️" type="upload-cloud" />
)
export const ConfigurationIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="⚙️" type="settings" />
)
export const AlertIcon = (options?: TypedIconOptions) => (
	<FeatherIcon
		title="Warning"
		color="#b00000"
		strokeWidth={2}
		type="alert-triangle"
	/>
)
export const AltitudeIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="altitude" type="arrow-up" />
)
export const XIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} color="#b00000" title="X" type="x" />
)
export const XSquareIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="[X]" type="x-square" />
)
export const CloseIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="close" type="x" />
)
export const UnknownIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="❓" type="alert-circle" />
)
export const OutdatedConfigValueIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} color="#b00000" title="⭕" type="circle" />
)
export const ThermometerIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Thermometer" type="thermometer" />
)
export const SunIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Sun" type="sun" />
)
export const CloudLightningIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="🌩️" type="cloud-lightning" />
)
export const HelpIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="💁" type="help-circle" />
)
export const CloudRainIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Rainy cloud" type="cloud-rain" />
)
export const CloudIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="☁️" type="cloud" />
)
export const ParcelIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="📦" type="package" />
)
export const CellularIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="cellular" type="bar-chart" />
)
export const BatteryIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="🔋" type="battery-charging" />
)
export const ClockIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="🕒" type="clock" />
)
export const NeighboringCellsIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Neighboring Cells" type="loader" />
)
export const MapIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="🗺️" type="map" />
)
export const OutdatedDataIcon = (options?: TypedIconOptions) => (
	<FeatherIcon
		{...options}
		color="#b46c10"
		title="Outdated data"
		type="frown"
	/>
)
export const AlertOctagonIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="🤷" type="alert-octagon" />
)
export const InfoIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="ℹ️" type="info" />
)
export const LogoutIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Sign out" type="log-out" />
)
export const SmartphoneIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Smartphone" type="smartphone" />
)
export const BellIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="Bell" type="bell" />
)

export const ChevronDownIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="⌄" type="chevron-down" />
)

export const ChevronUpIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="^" type="chevron-up" />
)

export const UserIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="User" type="user" />
)

export const DangerIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="warning" type="alert-triangle" />
)

export const LoadMoreIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="load more" type="plus-square" />
)

export const ButtonIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="button" type="stop-circle" />
)

export const ReloadIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="reload" type="refresh-cw" />
)

export const FOTAIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="FOTA" type="download-cloud" />
)

export const CenterIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="center" type="crosshair" />
)

export const ImpactsIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="impacts" type="alert-triangle" />
)

export const PresetsIcon = (options?: TypedIconOptions) => (
	<FeatherIcon {...options} title="presets" type="sliders" />
)

export const QueuedAtIcon = CloudUploadIcon

export const LoadingIcon = (options?: TypedIconOptions) => (
	<FeatherIcon
		{...options}
		title="loading ..."
		type="loader"
		className={styles.rotate}
	/>
)

export const IconWithText: FunctionComponent<PropsWithChildren<any>> = ({
	children,
	...rest
}) => (
	<span className={`${styles.iconWithText} iconWithText`} {...rest}>
		{children}
	</span>
)
